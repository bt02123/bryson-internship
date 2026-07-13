import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { nftId } = useParams();
  const [itemDetails, setItemDetails] = useState({});

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`,
        );
        setItemDetails(data);
      } catch (err) {
        console.error("ItemDetails API failed:", err);
      }
    }

    fetchItemDetails();
  }, [nftId]);

  const isLoading = Object.keys(itemDetails).length === 0;

  const SkeletonItem = () => {
    return (
      <div className="row item-details-skeleton">
        <div className="col-md-6 text-center">
          <div className="skeleton skeleton-nft-image"></div>
        </div>
        <div className="col-md-6">
          <div className="item_info">
            <div className="skeleton skeleton-title"></div>
            <div className="item_info_counts">
              <div className="skeleton skeleton-views"></div>
              <div className="skeleton skeleton-likes"></div>
            </div>
            <div className="skeleton skeleton-description"></div>
            <div className="skeleton skeleton-description"></div>
            <div className="skeleton skeleton-description short"></div>
            <div className="skeleton-owner-block">
              <div className="skeleton skeleton-owner-avatar"></div>
              <div className="skeleton skeleton-owner-name"></div>
            </div>
            <div className="skeleton-creator-block">
              <div className="skeleton skeleton-creator-avatar"></div>
              <div className="skeleton skeleton-creator-name"></div>
            </div>
            <div className="skeleton skeleton-price-label"></div>
            <div className="skeleton skeleton-price-value"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {isLoading ? (
                <SkeletonItem />
              ) : (
                <>
                  <div data-aos="fade-in" data-aos-duration="1500" className="col-md-6 text-center">
                    <img
                      src={itemDetails.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2 data-aos="fade-up">
                        {itemDetails.title} {itemDetails.tag}
                      </h2>

                      <div
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="item_info_counts"
                      >
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {itemDetails.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {itemDetails.likes}
                        </div>
                      </div>
                      <p data-aos="fade-up" data-aos-delay="300">
                        {itemDetails.description}
                      </p>
                      <div className="d-flex flex-row">
                        <div
                          data-aos="fade-up"
                          data-aos-delay="500"
                          className="mr40"
                        >
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${itemDetails.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={itemDetails.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemDetails.ownerId}`}>
                                {itemDetails.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div
                          data-aos="fade-up"
                          data-aos-delay="700"
                          className="de_tab_content"
                        >
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${itemDetails.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={itemDetails.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemDetails.creatorId}`}>
                                {itemDetails.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <div data-aos="fade-up" data-aos-delay="900">
                          <h6>Price</h6>
                          <div className="nft-item-price">
                            <img src={EthImage} alt="" />
                            <span>{itemDetails.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
