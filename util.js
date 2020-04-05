//Swap endianess
function swap16(val) {
    return ((val & 0xFF) << 8)
        | ((val >> 8) & 0xFF);
}

function swap32(val) {
    return ((val & 0xFF) << 24)
        | ((val & 0xFF00) << 8)
        | ((val >> 8) & 0xFF00)
        | ((val >> 24) & 0xFF);
}

function readNumber(data, offset, dataType) {
    let value = NaN;
    if(dataType === 8) value = read8(data, offset);
    else if (dataType === 16) value = read16(data, offset);
    else if (dataType === 32) value = read32(data, offset);
    return value
}

function read8(data, offset) {
    return data.getUint8(offset)
}

function read16(data, offset) {
    return swap16(data.getUint16(offset));
}

function read32(data, offset) {
    return swap32(data.getUint32(offset));
}
