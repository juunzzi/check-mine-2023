const colors = {
    primary_600: '#00FFA3',
    primary_500: '#10FFA9',
    primary_400: '#3CFFB9',
    primary_300: '#65FFC8',
    primary_200: '#7BFFD0',
    primary_100: '#85FFD3',

    light_grey_200: '#C1C1C1',
    light_grey_100: '#DFDFDF',

    white_100: '#FFFFFF',

    grey_400: '#555555',
    grey_300: '#6F6F6F',
    grey_200: '#8B8B8B',
    grey_100: '#A5A5A5',

    dark_grey_200: '#242424',
    dark_grey_100: '#3D3D3D',

    red_800: '#E81300',

    green_500: '#49ff66',

    orange_500: '#f68a32',

    background_4: '#F5F4F3',
    background_3: '#F7F7F7',
    background_2: '#F6F4EE',
    background_1: '#FAFAF6',
    background_0: '#FDFDFD',
} as const

const shadow = {
    type_1: '0px 0px 2px rgba(0, 0, 0, 0.2)',
    type_2: '0px 8px 20px rgba(0, 0, 0, 0.1)',
    type_3: '0px 0px 4px rgba(0, 0, 0, 0.12)',
    type_4: '0px 0px 2px rgba(0, 0, 0, 0.24)',
    type_5: '0px 0px 2px rgba(0, 0, 0, 0.2)',
    type_6: '0px 4px 12px rgba(0, 0, 0, 0.16)',
    type_7: '0px 0px 12px rgba(0, 0, 0, 0.16)',
} as const

const theme = {
    colors,
    shadow,
}

export default theme
