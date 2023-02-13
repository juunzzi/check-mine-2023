import {css} from '@emotion/react'

const globalStyle = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font: inherit;
        color: inherit;
        flex-shrink: 0;
    }

    body {
        font-family: 'Pretendard';
        letter-spacing: -0.03px;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    ol,
    ul {
        list-style: none;
    }

    li {
        list-style: none;
    }

    button {
        cursor: pointer;
        border: 0;
        background-color: inherit;
    }

    div {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }

    div::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }

    input[type='number']::-webkit-outer-spin-button,
    input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
    input[type='number'] {
        -moz-appearance: textfield;
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes fade-out {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    @-webkit-keyframes slide-in-bottom {
        0% {
            -webkit-transform: translateY(1000px);
            transform: translateY(1000px);
            opacity: 0;
        }
        100% {
            -webkit-transform: translateY(-50%, -50%);
            transform: translateY(-50%, -50%);
            opacity: 1;
        }
    }
    @keyframes slide-in-bottom {
        0% {
            -webkit-transform: translate(-50%, 1000px);
            transform: translate(-50%, 1000px);
            opacity: 0;
        }
        100% {
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            opacity: 1;
        }
    }
`

export default globalStyle
