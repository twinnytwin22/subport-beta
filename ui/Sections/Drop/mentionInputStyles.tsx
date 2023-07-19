export default {
    control: {
        backgroundColor: '#000',
        fontSize: 16,
        // fontWeight: 'normal',
    },
    '&multiLine': {
        control: {
            fontFamily: 'monospace',
            minHeight: 63,
            width: '100 %',

        },
        highlighter: {
            padding: 9,
            // border: '1px solid transparent',
        },
        input: {
            //  padding: 9,
            //    border: '1px solid silver',
            width: '100 %',

        },
    },
    '&singleLine': {
        display: 'inline-block',
        width: '100 %',
        highlighter: {
            padding: 1,
            // border: '2px inset transparent',
        },
        input: {
            // padding: 1,
            //    border: '2px inset',
        },
    },
    suggestions: {
        list: {
            backgroundColor: 'black',
            border: '1px solid rgba(0,0,0,0.15)',
            fontSize: 16,
        },
        item: {
            padding: '5px 15px',
            borderBottom: '1px solid rgba(0,0,0,0.15)',
            '&focused': {
                backgroundColor: '#000',
            },
        },
    },
}