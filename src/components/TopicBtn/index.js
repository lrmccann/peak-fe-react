import React, { useEffect, useState } from "react";
import './style.css';

export default function TopicBtn(props) {
  const [clicked, setClicked] = useState(false);
  const [bgColor, setBgColor] = useState();
  const [fontColor, setFontColor] = useState();

  useEffect(() => {
    if (clicked === true && props.limit >= 0) {
      setFontColor('white');
      return setBgColor("rgb(84, 84, 216)");
    } else if (clicked === false) {
      setFontColor('black');
      return setBgColor("white");
    } else if (props.limit < 0) {
      return;
    }
  }, [clicked, props.limit]);

  const handleSelect = (e) => {
    if (clicked === false && props.limit > 0) {
      props.getTopic(e);
      return setClicked(true);
    } else if (clicked === true) {
      props.removeTopic(e);
      return setClicked(false);
    } else if (props.limit < 0) {
      return;
    }
  };

  return (
    <div className="topic-btn-cont">
      <button
        style={{ backgroundColor: bgColor , color : fontColor }}
        onClick={(e) => handleSelect(e.target.id)}
        id={props.topic}
        className="btn-topic"
      >
        <p id={props.topic}>{props.topic}</p>
      </button>
    </div>
  );
}
