import React, { useState } from "react";
import s from "../styles/DetailPostBlock.module.css";
import Bounce from "react-reveal/Bounce";
import { selectAllPosts } from "./../redux/selectors/posts-selectors";

const DetailPostBlock = ({ onClickListItems, details, sortDetails }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const statePosts = ["for public posts", "for private posts"];
  //   const statePosts = ["for public", "for private", "3"];
  const sortName = statePosts[selected];
  const onClickListItem = (index) => {
    setSelected(index);
    setOpen(false);
  };

  const rootClasses = [s.lis];
  if (open) {
    rootClasses.push(s.active);
  }

  return (
    <div className={s.blogs}>
      <div className={s.box}>
        <div className={s.container}>
          <div className={s.post_info_box}>
            <img src={sortDetails.image} alt="img" />
            <p>Back-end blog</p>
          </div>
          <div className={s.title_container}>
            <div className={s.title}>
              <h2>First day at the office</h2>
              <span onClick={() => setOpen(!open)}>({sortName})</span>
            </div>
            <div className={s.select_form}>
              <div className={s.date_info}>12/12/2022 at 15:46:58</div>
              {open && (
                <Bounce top>
                  <div className={s.select_box}>
                    <ul>
                      {statePosts.map((name, i) => {
                        return (
                          <li
                            key={i}
                            onClick={() => onClickListItem(i)}
                            //   onChange={(i) => setSelected(i)}
                            //   className={!selected ? rootClasses.join(" ") : ""}
                            className={selected === i ? s.lisActive : s.lis}
                          >
                            {name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Bounce>
              )}
            </div>
          </div>

          <div className={s.main_img}>
            <img src={sortDetails.image} alt="img" />
          </div>
          <textarea className={s.text_form} name="" id="" cols="30" rows="10">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
            dolorum quis repellendus sunt veritatis. Accusamus aperiam
            architecto blanditiis dolores harum impedit minima non quo saepe
            totam ullam, vel vero voluptatibus.
          </textarea>
        </div>
      </div>
    </div>
  );
};

export default DetailPostBlock;
