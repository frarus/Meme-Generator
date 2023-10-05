
import IconButton from '@material-ui/core/IconButton';


function NewButton(props) {
  
    return (<>
        <IconButton className="fixed-right-bottom"  onClick={()=> {props.setShowModalCreate(true); 
        props.setShowModalCreateMeme({
            id: undefined,
            title: "",
            background: "toystory.png",
        
            positionOfSentence1: "bottom-single-text",
            positionOfSentence2: "",
            positionOfSentence3: "",
            font: "Anton",
            color: "White",
            visibility: "protected",
            creator: "props.username"
          })}}>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="dark" className=" bi bi-plus-circle-fill" viewBox="0 0 16 16" style={{ margin: 10 }}>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </svg>
            </div>

        </IconButton>
       
    </>
    )
}

export default NewButton;