import React from 'react'
import allImages from './images'

function imgName (name) {
    let newName = name.replaceAll(' ', '-');
    return newName.toLowerCase().replace('.', '');
}

const JobCard = ({data, actions}) => {

    const {sortByRole, sortByLevel, sortByLanguages, sortByTools, addFilter } = actions;

    return (
        <div className="job-card">
            <div className="details">
                <figure>
                    <img src={allImages[imgName(data.company)]} alt="" />
                </figure>
                <div className="text">
                    <div className="top-text">
                    <p className="title">{data.company}</p>
                    <div className="badges">
                        <button hidden={data.new === false} className="new-badge">New</button>
                        <button hidden={data.featured === false} className="featured-badge">Featured</button>
                    </div>
                </div>
                    <h2>{data.position}</h2>
                    <div className="info">
                        <span>{data.postedAt}</span>
                        <span>{data.contract}</span>
                        <span>{data.location}</span>
                    </div>
                </div>
            </div>
            <div className="tags">
                <button className="tag" id={data.role} onClick={() => {sortByRole(data.role); addFilter(data.role)}}>
                    {data.role}
                </button>
                <button className="tag" id={data.level} onClick={() => {sortByLevel(data.level); addFilter(data.level)}}>
                    {data.level}
                </button>
                {
                    data.languages.map(lang => (
                        <button className="tag" id={lang} key={data.languages.indexOf(lang)} onClick={() => {sortByLanguages(lang); addFilter(lang)}}>
                            {lang}
                        </button>
                    ))
                }
                {
                    data.tools.map(tool => (
                        <button className="tag" id={tool} key={data.tools.indexOf(tool)} onClick={() => {sortByTools(tool); addFilter(tool)}}>
                            {tool}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default JobCard
