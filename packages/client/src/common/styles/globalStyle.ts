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

    @-webkit-keyframes bounce-top {
        0% {
            -webkit-transform: translateY(-45px);
            transform: translateY(-45px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
            opacity: 1;
        }
        24% {
            opacity: 1;
        }
        40% {
            -webkit-transform: translateY(-24px);
            transform: translateY(-24px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
        }
        65% {
            -webkit-transform: translateY(-12px);
            transform: translateY(-12px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
        }
        82% {
            -webkit-transform: translateY(-6px);
            transform: translateY(-6px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
        }
        93% {
            -webkit-transform: translateY(-4px);
            transform: translateY(-4px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
        }
        25%,
        55%,
        75%,
        87% {
            -webkit-transform: translateY(0px);
            transform: translateY(0px);
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
        }
        100% {
            -webkit-transform: translateY(0px);
            transform: translateY(0px);
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
            opacity: 1;
        }
    }
    @keyframes bounce-top {
        0% {
            -webkit-transform: translateY(-45px);
            transform: translateY(-45px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
            opacity: 1;
        }
        24% {
            opacity: 1;
        }
        40% {
            -webkit-transform: translateY(-24px);
            transform: translateY(-24px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
        }
        65% {
            -webkit-transform: translateY(-12px);
            transform: translateY(-12px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
        }
        82% {
            -webkit-transform: translateY(-6px);
            transform: translateY(-6px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
        }
        93% {
            -webkit-transform: translateY(-4px);
            transform: translateY(-4px);
            -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
        }
        25%,
        55%,
        75%,
        87% {
            -webkit-transform: translateY(0px);
            transform: translateY(0px);
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
        }
        100% {
            -webkit-transform: translateY(0px);
            transform: translateY(0px);
            -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
            opacity: 1;
        }
    }
`

export default globalStyle
