import React from 'react'
// this is for progress bar how much amount is raised for blog
const Progress = ({ done }) => {
    const [style, setStyle] = React.useState({});
    setTimeout(() => {
        const newStyle = {
            opacity: 1,
            width: 10,
        }

        setStyle(newStyle);
    }, 200);
    console.log(done)
    return (
        <div className="progress" >
            <div className="progress-done" style={style}>
                <span style={{ marginLeft: "120px", color: "black" }}>{done}%</span>
            </div>
        </div>
    )

}

export default (Progress);