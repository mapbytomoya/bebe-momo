"""MP4 の音声トラック(trak, hdlr=soun)を同じサイズの free ボックスに置き換える。
オフセットは変わらないので映像はそのまま。あとで avconvert のパススルーで書き直すと
参照されなくなった音声データは出力に含まれない。
Usage: python3 -I tools/drop_audio.py in.mp4 out.mp4"""
import struct, sys

data = bytearray(open(sys.argv[1], 'rb').read())

def boxes(start, end):
    i = start
    while i + 8 <= end:
        size, typ = struct.unpack('>I4s', data[i:i+8])
        hdr = 8
        if size == 1:
            size = struct.unpack('>Q', data[i+8:i+16])[0]; hdr = 16
        elif size == 0:
            size = end - i
        yield i, size, typ.decode('latin1'), hdr
        i += size

dropped = 0
for i, size, typ, hdr in boxes(0, len(data)):
    if typ != 'moov':
        continue
    for j, s2, t2, h2 in boxes(i + hdr, i + size):
        if t2 != 'trak':
            continue
        # hdlr の handler_type が soun のトラックだけを対象にする
        k = bytes(data[j:j+s2]).find(b'hdlr')
        if k < 0 or bytes(data[j+k+12:j+k+16]) != b'soun':
            continue
        data[j+4:j+8] = b'free'
        data[j+8:j+s2] = bytes(s2 - 8)
        dropped += 1
open(sys.argv[2], 'wb').write(data)
print('dropped audio tracks:', dropped)
