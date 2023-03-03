import PrayersFlatlist from "components/FlatList/PrayersFlatlist";
import { Box, HStack, Text } from "native-base";
import React, { ReactNode, useEffect, useState } from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import { getPopularMovies } from "services/themoviedb/movie.api";
import { getPopularTVShows } from "services/themoviedb/tvshow.api";
import { Movie } from "types/movie.type";
import { TVShow } from "types/tvshow.type";
import { HBottomGradientBackground } from "../../../../components/HBottomGrandientBackground";
import { HTopGrandientBackground } from "../../../../components/HTopGrandientBackground";
import { HHeaderGrandientBackground } from "../HHeaderGrandientBackground";
import {
  SContainer,
  SHighlightSubtitle,
  SHighlightTitle,
  SImageBackground,
} from "./styles";

interface Props {
  children: ReactNode;
  onPress?: (id: number, type?: "movie" | "tv") => void;
}

const highlightType = ["movie", "tv"];

export function HHighlightPanel({ children, onPress }: Props) {
  const [movie, setMovie] = useState<Movie>();
  const [tvShow, setTvShow] = useState<TVShow>();

  async function getPopularHighlightData() {
    const type =
      highlightType[Math.floor(Math.random() * highlightType.length)];
    const items = await (type === "movie"
      ? getPopularMovies()
      : getPopularTVShows());

    const item =
      items.results[Math.floor(Math.random() * items.results.length)];

    if (type === "movie") setMovie(item as Movie);
    else setTvShow(item as TVShow);
  }

  function getImage() {
    // Exibir imagem de carregando
    if (!movie && !tvShow) return {};

    return {
      uri: `https://image.tmdb.org/t/p/w500${
        !!movie ? movie.poster_path : tvShow?.poster_path
      }`,
    };
  }

  function getOverview() {
    if (!!movie && movie.overview.length > 80) {
      return `${movie.overview.substring(0, 80)}...`;
    }

    if (!!tvShow && tvShow.overview.length > 80) {
      return `${tvShow.overview.substring(0, 80)}...`;
    }

    return "";
  }

  useEffect(() => {
    getPopularHighlightData();
  }, []);

  const incentives = [
    {
      name: "Free Shipping",
      description:
        "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
      imageSrc:
        "https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg",
    },
    {
      name: "24/7 Customer Support",
      description:
        "Our AI chat widget is powered by a naive series of if/else statements. Guaranteed to irritate.",
      imageSrc:
        "https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg",
    },
    {
      name: "Fast Shopping Cart",
      description:
        "Look how fast that cart is going. What does this mean for the actual experience? I don't know.",
      imageSrc:
        "https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg",
    },
  ];
  return (
    <SContainer>
      <TouchableHighlight
        onPress={() =>
          !!onPress &&
          onPress(
            !!movie ? movie.id : !!tvShow ? tvShow.id : 0,
            !!movie ? "movie" : "tv"
          )
        }
      >
        {/* <SImageBackground source={getImage()}> */}
        <SImageBackground
          resizeMode="cover"
          // source={require("../../../../../animations/day-to-night-cycle.gif")}
          source={require("../../../../../assets/RamadanWindowDesert2.png")}
        >
          <HHeaderGrandientBackground />
          <HBottomGradientBackground>
            <SHighlightTitle>
              {/* {!!movie ? movie.title : tvShow?.name} */}
              Daily prayers
            </SHighlightTitle>

            {/* <SHighlightSubtitle>{getOverview()}</SHighlightSubtitle>
             */}
            <HStack
              alignItems={"center"}
              justifyContent={"center"}
              mt={"2"}
              w="80%"
              p="2"
              // borderWidth="1px"
              borderColor={"grey.400"}
              rounded="xl"
            >
              <PrayersFlatlist />
            </HStack>
          </HBottomGradientBackground>
        </SImageBackground>
      </TouchableHighlight>

      <HTopGrandientBackground>{children}</HTopGrandientBackground>
    </SContainer>
  );
}
