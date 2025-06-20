import "./dataInColumn.css";

function dataInColumn({title, titlePriority = 2, arrayOptionsKeyValue = [["Option 1", "Result 1"], ["Option 2"]], hrLineAfterOption = [], listStyle = "disc"}) {

    const HeadingTag = `h${titlePriority}`

    function listItems(){

    return  arrayOptionsKeyValue.map((KeyValue, index) => {
                if ( hrLineAfterOption.includes(index)) {
                    return (
                        <React.Fragment key={index}>
                          <li><div className="item-content"><span>{KeyValue[0]}</span>{KeyValue[1] && <span><b>{KeyValue[1]}</b></span>}</div></li>
                          <hr />
                        </React.Fragment>
                    )
                }
                else {
                    return <li key={index}><div className="item-content"><span>{KeyValue[0]}</span>{KeyValue[1] && <span style={{textAlign: "right", whiteSpace: "pre-line"}}><b>{KeyValue[1]}</b></span>}</div></li>
                }
            })
        
            
    }



    return (
        <div className="data-in-column">
            <HeadingTag className="title-column">{title}</HeadingTag>
            <ul style={{listStyleType: listStyle}}>
                {listItems()}
            </ul> 
        </div>
    )
};


export default dataInColumn;