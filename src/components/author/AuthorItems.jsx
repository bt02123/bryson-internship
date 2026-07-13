import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import SkeletonCard from "../SkeletonCard";

const Author = () => {
  const { authorId } = useParams();
};

const AuthorItems = () => {
  const { authorId } = useParams();
  const [authorItems, setAuthorItems] = useState([]);
  const [authorImage, setAuthorImage] = useState({});

  useEffect(() => {
    async function fetchAuthorItems() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
      );
      setAuthorItems(data.nftCollection || []);
      setAuthorImage(data.authorImage);
    }

    fetchAuthorItems();
  }, [authorId]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {authorItems.length === 0 ? (
            <div className="row">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="col-6 col-md-3 mb-4">
                  <SkeletonCard />
                </div>
              ))}
            </div>
          ) : (
            <div className="row">
              {authorItems.map((item) => (
                <div key={item.id} className="col-6 col-md-3 mb-4">
                  <div data-aos="fade-up"
                        data-aos-easing="linear"
                        data-aos-duration="500"
                        data-aos-delay={item * 100}
                        className="nft__item">
                    <div className="author_list_pp">
                      <Link to={`/author/${authorId}`}>
                        <img className="lazy" src={authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title}
                        />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>

                      <div className="nft__item_price">{item.price} ETH</div>

                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
