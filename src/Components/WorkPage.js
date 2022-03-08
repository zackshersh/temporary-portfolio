import { useState, useEffect } from "react"

import TagButton from "./TagButton"
import { tags, reorderTags } from "../tag-management"

import { items } from "../content"
import ContentWidget from "./ContentWidget"

import Title from "./Title"
import AboutMe from "./AboutMe"

const WorkPage = () => {

    const [activeTags, setActiveTags] = useState({});

    const [activeItems, setActiveItems] = useState([]);

    const [aboutDisplay, setAboutDisplay] = useState(false);

    const handleTagClick = (tagName) => {
        let newActiveTags = {...activeTags}

        if(activeTags[tagName]){
            newActiveTags[tagName] = false

        } else {
            newActiveTags[tagName] = true
        }

        tags.forEach(tag => {
            if(tag.name == tagName){
                tag.active = newActiveTags[tagName]
            }
        })

        reorderTags()

        setActiveTags(newActiveTags)

        console.log(activeTags)

    }

    // useEffect(() => {
    //     let eligibleItems = [];

    //     items.forEach(item => {

    //         for(const tag in activeTags){
    //             if(!item.tags[tag] & activeTags[tag]){
    //                 return;
    //             }
    //         }
    //         eligibleItems.push(item)
    //     })

    //     setActiveItems(eligibleItems);
    // })



    return (
        <div className="Work-Page">
            <Title />
            <div className="Work-Wrapper">
                <div className="Tags-Cont">
                    <p>Tags:</p>
                    { tags.map((tag,i) => {
                            return <TagButton handler={handleTagClick} key={i} title={tag.name} active={tag.active}/>
                        })
                    }
                </div>
                <div className="Content-Cont">
                    <div className="Content-Col">
                    {
                        items.map((item,i) => {

                            if(i >= items.length/2){
                                return;
                            }
                            // console.log(item)
                            
                            for(const tag in activeTags){
                                if(!item.tags[tag] & activeTags[tag]){
                                    return;
                                }
                            }
                            
                            return <ContentWidget key={i} item={item}/>
                        })
                    }
                    </div>
                    <div className="Content-Col">
                    {
                        items.map((item,i) => {
                            
                            if(i < items.length/2){
                                return;
                            }
                            // console.log(item)
                            
                            for(const tag in activeTags){
                                if(!item.tags[tag] & activeTags[tag]){
                                    return;
                                }
                            }
                            
                            return <ContentWidget key={i} item={item}/>
                        })
                    }
                    </div>

                </div>
                <button onMouseDown={() => setAboutDisplay(true)} className="About-Button">Here's some stuff about me</button>
            </div>
            <AboutMe setDisplay={setAboutDisplay} display={aboutDisplay} />
        </div>
    )
}

export default WorkPage