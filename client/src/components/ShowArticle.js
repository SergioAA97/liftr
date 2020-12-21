import Title from "antd/lib/typography/Title";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import articles from "../articles/articles.json";

export default function ShowArticle() {
  const { slug } = useParams();
  const history = useHistory();
  const article = articles.filter((x) => x.link.includes(slug))[0];
  const { title, img,  description, content, date, author } = article;
  console.log(article);
  const containerStyle = {
    padding: "1rem 5rem",
  };

  const paras = content.split("\n");
  console.log(paras);

  if (article) {
    return (
      <div className="inv-font">
        <img
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            overflow: "hidden",
            height: "100%",
            margin: "0 0 2rem 0",
          }}
          alt={title}
          src={img}
        />
        <div style={containerStyle}>
          <Title level={1}>{title}</Title>
          <div>
            {author} - on {new Date(date).toLocaleString()}
          </div>
          <div>
            <b>
              <p>{description}</p>
            </b>
          </div>
          <div>{paras && paras.map((x) => <p>{x}</p>)}</div>
        </div>
      </div>
    );
  } else {
    history.goBack();
  }
}
