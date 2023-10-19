export default {
  // control: {
  //      backgroundColor: "system",
  //      fontSize: 14,
  //       color: '#000',
  ///       fontWeight: "normal",
  //   },

  //   "&multiLine": {
  //      control: {
  //          fontFamily: "monospace",
  //          minHeight: 63,
  //      },
  ///      highlighter: {
  //         padding: 9,
  //         border: "1px solid transparent",
  //     },
  //     input: {
  //         padding: 9,
  //         border: "1px solid silver",
  //         textColor: '#000',
  //
  //     },
  //   },

  '&singleLine': {
    //   display: "inline-block",
    //  width: 180,

    highlighter: {
      padding: 2
      //   border: "2px inset transparent",
    },
    input: {
      padding: 2
      // border: "2px inset",
      //       textColor: '#000',
    }
  },

  suggestions: {
    list: {
      //     backgroundColor: "white",
      //   border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14
    },
    item: {
      padding: '5px 15px'
      //   borderBottom: "1px solid rgba(0,0,0,0.15)",
      //   "&focused": {
      //       backgroundColor: "#cee4e5",
      //   },
    }
  }
};
