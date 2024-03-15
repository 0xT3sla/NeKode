def encode_to_binary(text):
    binary_str = ' '.join(''.join(format(ord(char), '08b').replace('0', 'Mew').replace('1', 'Meow')) for char in text)
    return binary_str

def decode_from_binary(binary_str):
    binary_list = binary_str.split()
    text = ''
    for binary in binary_list:
        binary = binary.replace('Mew', '0').replace('Meow', '1')
        binary = binary.replace(' ', '')  # Remove spaces between binary groups
        text += chr(int(binary, 2))
    return text