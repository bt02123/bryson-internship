import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();

  const [authorHeader, setAuthorHeader] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    async function fetchAuthorHeader() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
      );
      setAuthorHeader(data);
      setFollowers(data.followers);
    }

    fetchAuthorHeader();
  }, [authorId]);

  const handleFollow = () => {
    if (isFollowing) {
      setFollowers(followers - 1);
      setIsFollowing(false);
    } else {
      setFollowers(followers + 1);
      setIsFollowing(true);
    }
  };

  const SkeletonCardAuth = () => {
    return (
      <div className="d_profile de-flex">
        <div className="de-flex-col">
          <div className="profile_avatar">
            <div className="skeleton skeleton-avatar"></div>
            <div className="skeleton skeleton-checkmark"></div>
            <div className="profile_name">
              <h4>
                <div className="skeleton skeleton-name"></div>
                <div className="skeleton skeleton-username"></div>
                <div className="skeleton skeleton-wallet"></div>
                <div className="skeleton skeleton-copy-btn"></div>
              </h4>
            </div>
          </div>
        </div>

        <div className="profile_follow de-flex">
          <div className="de-flex-col">
            <div className="skeleton skeleton-followers"></div>
            <div className="skeleton skeleton-follow-btn"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {!authorHeader ? (
                  <SkeletonCardAuth />
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorHeader.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorHeader.authorName}
                            <span className="profile_username">
                              @{authorHeader.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {authorHeader.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {followers} Followers
                        </div>

                        <button className="btn-main" onClick={handleFollow}>
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
