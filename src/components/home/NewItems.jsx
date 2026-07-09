import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import OwlCarousel from "react-owl-carousel2";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import Countdown from "../Countdown";
import ItemCard from "../ItemCard";
import SkeletonCard from "../SkeletonCard";

const NewItems = () => {
  const options = {
    items: 4,
    nav: true,
    dots: false,
    autoplay: false,
    loop: true,
    margin: 20,
    navText: [
      '<span class="custom-prev"></span>',
      '<span class="custom-next"></span>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1024: {
        items: 4,
      },
    },
  };
  const [newItems, setNewItems] = useState([]);

  async function fetchNewItems() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`,
    );
    setNewItems(data);
  }
  useEffect(() => {
    fetchNewItems();
  }, []);

    return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {newItems.length === 0 ? (
            <div className="row">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="col">
                  <SkeletonCard />
                </div>
              ))}
            </div>
          ) : (
            <OwlCarousel options={options}>
              {newItems?.map((item) => (
                <ItemCard key ={item.id} {...item}/>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
