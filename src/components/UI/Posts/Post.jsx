import React, {Fragment, useState} from 'react';
import s from "../../../styles/PostsList.module.css";
import {Link} from "react-router-dom";
import Loader from "../../Loader";
import Flip from 'react-reveal/Flip';
import {AiTwotoneEdit, AiTwotoneDelete} from "react-icons/ai";


const Post = ({posts, remove}) => {
    // const [loading, setLoading]=useState(true)
    const [selected, setSelected] = useState(0)
    const details = posts
    const sortDetails = details[selected]
    const onClickListItem = (i) => {
        setSelected(i)
    }

    // const [tasks, setTasks] = useState(initialPostsTasks)
    // const image= { backgroundImage:`url(${tasks.image})`}
    const handleOnClickEditButton=()=>{
        return alert('Edit post')
    }
    const handleOnClickDeleteButton=()=>{
        return alert('Delete post')
    }
    return (
        <>
            <section className={s.posts_list}>
                {details.map( (post, i) => {
                        return (
                            <article key={post.id} className={s.post_item}>
                                <article className={s.main_img_box}>
                                    <Flip left>
                                        <div className={s.main_img}
                                             style={{backgroundImage:`url(${post.image})`}}>
                                        </div>
                                    </Flip>
                                </article>
                                <article>
                                    <Flip left>
                                        <div className={s.card_box }>
                                            <div className={s.image_post}
                                                 style={{backgroundImage:`url(${post.image})`}}
                                            ></div>
                                            <div className={s.text_container}>
                                                <div className={s.text_container_header}>
                                                    <Link to={'/postdetails'} >
                                                        <h2 className={s.title}> {post.title}</h2>
                                                    </Link>

                                                </div>
                                                <p>{post.text}</p>
                                                <p>{post.date}</p>
                                            </div>
                                            <div className={s.btns_box}>
                                                <Link to={'/postedit'} >
                                                    <span onClick={()=>onClickListItem(i)}>
                                                        <AiTwotoneEdit/>
                                                    </span>
                                                </Link>

                                                <span onClick={()=>remove(post)}>
                                                    <AiTwotoneDelete/>
                                                </span>
                                            </div>
                                        </div>
                                    </Flip>
                                </article>



                            </article>
                        )
                    }
                )
                }
            </section>

        </>

    );
};

export default Post;
