import { Feather } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { HBody } from "components/HBody";
import { HLoading } from "components/HLoading";
import { HSimpleList } from "components/HSimpleList";
import { HHighlightItem } from "components/Items/HHighlightItem";
import {
  HLandscapeItem,
  HLandscapeItemFY,
} from "components/Items/HLandscapeItem";
import { HLongLandscapeItem } from "components/Items/HLongLandscapeItem";
import { HLongPortraitItem } from "components/Items/HLongPortraitItem";
import { HPortraitItem, HPortraitItemML } from "components/Items/HPortraitItem";
import { HSquareItem, HSquareItemML } from "components/Items/HSquareItem";
import { Box, Heading, Text, ZStack } from "native-base";
import React, { useEffect, useState } from "react";
import { RouterKey } from "routes/routes-keys";
import theme from "styles/GlobalStyles";
import { Movie } from "types/movie.type";
import { TVShow } from "types/tvshow.type";
import {
  IconicUnmissableData,
  justForYouData,
  MyListData,
  TalkingAboutData,
} from "../../../data/Home/home.js";
import { HHighlightPanel } from "./components/HHighlightPanel";
import {
  getDcMoviesTvShowsData,
  getIconicMoviesData,
  getMoviesData,
  getPopularMoviesTvShowsData,
} from "./home.service";

interface Props extends DrawerContentComponentProps {}

class ItemsHomeData {
  public movies: Array<Movie> = [];
  public popularMoviesTvShows: Array<Movie | TVShow> = [];
  public iconicMovies: Array<Movie> = [];
  public dcMoviesTvShows: Array<Movie | TVShow> = [];

  public isLoading() {
    return Object.values(this).some((x) => x === null || x.length === 0);
  }
}
export function HomePage({ navigation }: Props) {
  const [items, setItems] = useState<ItemsHomeData>(new ItemsHomeData());
  const [highlightMovie, setHighlightMovie] = useState<Movie>();

  function openSidebar() {
    navigation.openDrawer();
  }

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    const [movies, popularMoviesTvShows, iconicMovies, dcMoviesTvShows] =
      await Promise.all([
        getMoviesData(),
        getPopularMoviesTvShowsData(),
        getIconicMoviesData(),
        getDcMoviesTvShowsData(),
      ]);

    const data = new ItemsHomeData();
    data.movies = movies;
    data.popularMoviesTvShows = popularMoviesTvShows;
    data.iconicMovies = iconicMovies;
    data.dcMoviesTvShows = dcMoviesTvShows;

    setItems(data);
    setHighlightMovie(
      data.movies[Math.floor(Math.random() * data.movies.length)]
    );
  }

  function handleMyList() {
    console.log("navigate to my list");
  }

  function handleShowDetailItem(id: number, type: "movie" | "tv" = "movie") {
    navigation.navigate(RouterKey.DetailItemPage, { id, type });
  }

  if (items.isLoading()) {
    return <HLoading />;
  }

  return (
    <HBody openSidebar={openSidebar}>
      <HHighlightPanel onPress={handleShowDetailItem}>
        <HSimpleList
          title="My List"
          items={MyListData}
          onPressTitle={handleMyList}
          renderIconTitle={
            <Feather
              name="chevron-right"
              size={16}
              color={theme.colors.white}
            />
          }
          renderItem={({ item }) => (
            <HSquareItemML
              id={item.id}
              image={item.uri}
              title={item.title}
              onPress={(id: number) =>
                handleShowDetailItem(id, item.title ? "movie" : "tv")
              }
            />
          )}
        />
      </HHighlightPanel>
      <HSimpleList
        title="Just For You"
        items={justForYouData}
        renderItem={({ item }) => (
          // <ZStack>
          <HLandscapeItemFY
            // id={item.id}
            image={item.uri}
            // onPress={handleShowDetailItem}
          />
          //   <Text>hi</Text>
          // </ZStack>
          // <Box w="20" h="20" m="2" bg="white"></Box>
        )}
      />

      {/* <HSimpleList
        title="Wholesome and Unmissible"
        subtitle="You love them, we love them, and may their reward be with their Lord."
        items={IconicUnmissableData}
        renderItem={({ item }) => (
          <HPortraitItemML
            id={item.id}
            image={item.uri}
            title={item.title}
            onPress={handleShowDetailItem}
          />
        )}
      /> */}

      <HSimpleList
        title="Wholesome and Unmissible"
        subtitle="You love them, we love them, and may their reward be with their Lord."
        items={IconicUnmissableData}
        renderItem={({ item }) => (
          <Box p="2" flex="1" borderWidth="1" borderColor="white" bg="black">
            <Heading color="white">{item.name}</Heading>
            <Heading color="white">{item.time}</Heading>
          </Box>
        )}
      />

      <HSimpleList
        title="What the World Is Talking About"
        items={TalkingAboutData}
        onPressTitle={handleMyList}
        renderIconTitle={
          <Feather name="chevron-right" size={16} color={theme.colors.white} />
        }
        renderItem={({ item }) => (
          <HLongLandscapeItem
            id={item.id}
            image={item.uri}
            title={item.title}
            chart={item.chart}
            onPress={(id: number) =>
              handleShowDetailItem(id, item.title ? "movie" : "tv")
            }
          />
        )}
      />

      {/* <HSimpleList
        title="Watched to the MAX"
        subtitle="Our TOP 10 movies and series that are trending in your country this week."
        textAlign="center"
        items={items.popularMoviesTvShows}
        renderItem={({ item, index }) => (
          <HPortraitItem
            id={item.id}
            image={item.poster_path}
            title={index % 2 === 0 ? "HBO" : undefined}
            position={index + 1}
            onPress={(id: number) =>
              handleShowDetailItem(id, item.title ? "movie" : "tv")
            }
          />
        )}
      /> */}

      {/* <HSimpleList
        title="HBO Max Hubs"
        items={items.movies}
        onPressTitle={handleMyList}
        renderIconTitle={
          <Feather name="chevron-right" size={16} color={theme.colors.white} />
        }
        renderItem={({ item }) => (
          <HLongPortraitItem
            id={item.id}
            image={item.poster_path}
            onPress={handleShowDetailItem}
          />
        )}
      /> */}

      {!!highlightMovie && (
        <HHighlightItem
          title={highlightMovie.title}
          id={highlightMovie.id}
          subtitle={highlightMovie.overview}
          image={highlightMovie.backdrop_path}
          onPress={handleShowDetailItem}
        />
      )}

      {/* <HSimpleList
        title="Iconic Collections"
        items={items.iconicMovies}
        renderItem={({ item }) => (
          <HLandscapeItem
            id={item.id}
            image={item.backdrop_path}
            onPress={handleShowDetailItem}
          />
        )}
      /> */}

      {/* <HSimpleList
        title="The Ultimate Streaming Home of the DC Universe"
        items={items.dcMoviesTvShows}
        renderItem={({ item }) => (
          <HPortraitItem
            id={item.id}
            image={item.poster_path}
            onPress={(id: number) =>
              handleShowDetailItem(id, item.title ? "movie" : "tv")
            }
          />
        )}
      /> */}
    </HBody>
  );
}
