import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { Mutation } from 'react-apollo';
import { createPostComment } from '../../../../graphql/mutations';
import { forumPostComments } from '../../../../graphql/queries';
import { SubmitButton, SubmitWrapper, Wrapper } from './styles';
import './styles.css';


const styles = theme => ({
  root: {
    width: '60%',
    margin: '2.5rem auto',
  },
  button: {
    width: '20rem',
  },
  paper: {
    maxWidth: '100%',
  }
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
        [{ 'color': []}, {'background': []}]
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

  onCreateComment = async (commentCreate, error) => {
     const postId = this.props.postId;
    try {
      const response = await commentCreate({
        variables: {
          postId,
          comment: this.state.quillHtml
        },
        refetchQueries: [
          {
            query: forumPostComments,
            variables: { postId }
          }
        ]
      })
      this.setState({quillHtml: ''});
    } catch(e) {
      console.log(e);
      console.log(error);
    }
  }

  onQuillHtmlChange = (value) => {
    this.setState({quillHtml: value});
  }


  render() {
    const { classes } = this.props;
    const ReactQuill = this.ReactQuill;
    const { quillHtml } = this.state;
    // const {quillHtml, onQuillHtmlChange} = useContext(CreatePostContext);
    if (typeof window !== 'undefined' && ReactQuill) {
      const isValid =  quillHtml.length > 0
      return (
        <Mutation mutation={createPostComment}>
          {(commentCreate, { loading, error }) => (
            <>
                    <Wrapper>
                      <Paper className={classes.paper} elevation={1}>
                        <ReactQuill theme="snow"
                        ref={(el) => this.quillRef = el}
                        value={quillHtml}
                        onChange={(value) => this.onQuillHtmlChange(value)}
                        modules={this.editorOptions.modules}
                        formats={this.editorOptions.formats}
                        placeholder="Write Text"
                        />
                        <SubmitWrapper>
                          <SubmitButton>
                            <Button disabled={!isValid || loading} onClick={() => this.onCreateComment(commentCreate, error)} size="large" variant="contained" color="primary" className={classes.button}>
                              Post
                            </Button>
                          </SubmitButton>
                        </SubmitWrapper>
                        </Paper>
                    </Wrapper>
              </>
            )}
         </Mutation>
      )
    } else {
      return (
        null
      )
    }
  }
}



export default withStyles(styles)(Editor);
