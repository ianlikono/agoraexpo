import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import './styles.css';

const styles = theme => ({
  root: {
    width: '60%',
    margin: '2.5rem auto',
  },
});


class Editor extends React.PureComponent {
  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill')
    }
    this.state = {
      quillHtml: ""
    };
  }

   editorOptions = {
    modules: {
      toolbar: {
        container: [
        [{ 'header': '3'}, {'header': '4'},{'header': '5'},{'header': '6'}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{'list': 'ordered'}, {'list': 'bullet'},
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        // handlers object will be merged with default handlers object
        image: async (image, callback)  => {
            var range = this.quillRef.getEditor().getSelection();
            const fileSelector = document.createElement('input');
            fileSelector.setAttribute('type', 'file');
            fileSelector.setAttribute('multiple', 'multiple');
            fileSelector.setAttribute('accept', 'image/*');
            fileSelector.click();
            fileSelector.onchange = async () => {
              const file = fileSelector.files[0];
              const data = new FormData();
              data.append('file', file);
              data.append('upload_preset', 'editorImages');
              const res = await fetch('https://api.cloudinary.com/v1_1/doelo01na/image/upload', {
                method: 'POST',
                body: data,
              });
              const uploadedFile = await res.json();
              const value = uploadedFile.secure_url;
              if(value) {
                  this.quillRef.getEditor().insertEmbed(range.index, 'image', value, "user");
              }
            };
          }
      }
    },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      }
    },
    formats: [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote','code-block',
      'list', 'bullet', 'indent',
      'link', 'image', 'video'
    ]
  }

  handleEditorChange = (value) => {
    this.setState({
      quillHtml: value,
    })
    // console.log(this.state.quillHtml)
  }

  // imageHandler = (image, callback)  => {
  //   console.log(' i run')
  //   var range = this.quillRef.getEditor().getSelection();
  //   var value = prompt('What is the image URL');
  //   if(value) {
  //       this.quillRef.getEditor().insertEmbed(range.index, 'image', value, "user");
  //   }
  // }

  render() {
    const { classes } = this.props;
    const { quillHtml } = this.state;
    const ReactQuill = this.ReactQuill
    if (typeof window !== 'undefined' && ReactQuill) {
      return (
        <>
            <ReactQuill theme="snow"
              ref={(el) => this.quillRef = el}
              value={this.state.quillHtml}
              onChange={(value) => this.handleEditorChange(value)}
              modules={this.editorOptions.modules}
              formats={this.editorOptions.formats}
              placeholder="Write Text"
              />
        </>
      )
    } else {
      return (
        null
      )
    }
  }
}



export default withStyles(styles)(Editor);