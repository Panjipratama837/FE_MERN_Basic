import React from 'react'

const CardBlog = (props) => {
  const { text, src, alt, category, date, classNameImg, classNameCat, author } = props

  return (
    <>
      <img className={classNameImg ? classNameImg : 'photo2'} src={src} alt={alt} />

      {category && <div style={{
        marginTop: '10px'
      }}>
        <span className={`category-${classNameCat}`}>{category}</span>
        {/* <span className='category-inspiration'>Published</span> */}
      </div>}

      {text && <div style={{
        marginTop: '10px'
      }}>
        <h3>{text}</h3>
      </div>}


      {date && <p style={{
        color: "grey",
        margin: 0,
      }}>{date}</p>}

      {author && <p style={{
        color: "grey",
        margin: 0,
      }}>{author}</p>}
    </>
  )
}

export default CardBlog