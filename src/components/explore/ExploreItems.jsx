import React, { useEffect, useState } from "react";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import ItemCard from "../ItemCard";
import SkeletonCard from "../SkeletonCard";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  async function fetchExploreItems(filter = "") {
    const url = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${
      filter ? `?filter=${filter}` : ""
    }`;

    const { data } = await axios.get(url);
    setExploreItems(data);
  }

  useEffect(() => {
    fetchExploreItems();
  }, []);

  useEffect(() => {
    fetchExploreItems(sortOption);
  }, [sortOption]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems.length === 0 ? (
        <div className="row">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="col-6 col-md-3 mb-4">
              <SkeletonCard className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" />
            </div>
          ))}
        </div>
      ) : (
        exploreItems.slice(0, visibleCount).map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <ItemCard key={item.id} {...item} />
          </div>
        ))
      )}
      {visibleCount < exploreItems.length && (
        <div className="col-md-12 text-center mt-4">
          <button onClick={loadMore} className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
