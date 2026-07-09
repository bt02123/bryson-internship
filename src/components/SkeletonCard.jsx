import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SkeletonCard = () => (
    <div className="nft__item skeleton">
      <div className="author_list_pp">
        <div className="skeleton-avatar"></div>
      </div>

      <div className="nft__item_wrap">
        <div className="skeleton-img"></div>
      </div>

      <div className="nft__item_info">
        <div className="skeleton-title"></div>
        <div className="skeleton-price"></div>
        <div className="skeleton-likes"></div>
      </div>
    </div>
  );

  export default SkeletonCard;