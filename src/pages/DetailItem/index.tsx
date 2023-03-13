import { Feather, Foundation, Ionicons } from "@expo/vector-icons";
import { HBody } from "components/HBody";
import { HBottomGradientBackground } from "components/HBottomGrandientBackground";
import { HTopGrandientBackground } from "components/HTopGrandientBackground";
import { useEffect, useState } from "react";
import { getMovieById, getPopularMovies } from "services/themoviedb/movie.api";
import Timeline from "react-native-beautiful-timeline";
import {
  SAdultBadge,
  SBannerItem,
  SButtonsContainer,
  SCircle,
  SContentItem,
  SImageBackground,
  SItemInfo,
  SMoreOptions,
  SNormalBadge,
  SSubtitle,
  STitle,
  STitleBadge,
} from "./styles";
import theme from "styles/GlobalStyles";
import { TVShow } from "types/tvshow.type";
import { Movie } from "types/movie.type";
import {
  getPopularTVShows,
  getTvShowById,
} from "services/themoviedb/tvshow.api";
import { HSimpleList } from "components/HSimpleList";
import { HPortraitItem } from "components/Items/HPortraitItem";
import { RouterKey } from "routes/routes-keys";
import { useNavigation } from "@react-navigation/native";
import { Box, Heading, HStack, Text, VStack } from "native-base";
import React from "react";
import { Image, View, Dimensions, Pressable } from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";
import { Magnetometer } from "expo-sensors";
import Table from "components/Table/Table";
import { latLocation, lonLocation } from "../../../data/location";
import { MyListData } from "../../../data/Home/home";
import { HSquareItemML } from "components/Items/HSquareItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFromLocalStorage } from "../../../src/lib";

export function DetailItem({ route }: any) {
  const [subscription, setSubscription] = useState(null);

  const [prayerStreak, setPrayerStreak] = useState(
    [
      { name: "Fajr", status: "pray now", streak: 0 },
      { name: "Dhuhr", status: "pray now", streak: 0 },
      { name: "Asr", status: "pray now", streak: 0 },
      { name: "Maghrib", status: "pray now", streak: 0 },
      { name: "Isha", status: "pray now", streak: 0 },
    ]
    //   {
    //   Fajr: "0",
    //   Dhuhr: "0",
    //   Asr: "0",
    //   Maghrib: "0",
    //   Isha: "0",
    // }
  );

  const [magnetometer, setMagnetometer] = useState(0);

  const [prayerTimes, setPrayerTimes] = React.useState([]);
  const [fajirStatus, setFajirStatus] = useState({ streak: 0, date: Date });
  const [dhuhrStatus, setDhuhrStatus] = useState();
  const [asrStatus, setAsrStatus] = useState();
  const [maghribStatus, setMaghribStatus] = useState();
  const [ishaStatus, setIshaStatus] = useState();

  const { height, width } = Dimensions.get("window");
  // console.log(prayerTimes);

  const setFromLocalStorage = async (key, array) => {
    for (let index = 0; index < array.length; index++) {
      let value = await getFromLocalStorage({ key: `${key}/${array[index]}` });
      if (value !== null) {
        switch (array[index]) {
          case array[index] == "Fajr":
            setFajirStatus(value);
            break;
          case array[index] == "Dhuhr":
            setDhuhrStatus(value);
            break;
          case array[index] == "Asr":
            setAsrStatus(value);
            break;
          case array[index] == "Maghrib":
            setMaghribStatus(value);
            break;
          case array[index] == "Isha":
            setIshaStatus(value);
            break;
          default:
            break;
        }
      }
    }
  };

  async function getPrayerTimes() {
    const response = await fetch(
      `http://api.aladhan.com/v1/timings?latitude=${latLocation}&longitude=${lonLocation}&method=2`
    );
    const data = await response.json();
    console.log(data);
    let prayerTimesArray: any = [];
    Object.entries(data.data.timings).forEach((element) => {
      prayerTimesArray.push({
        name: element[0],
        time: element[1],
        id: element[0],
      });
    });
    setPrayerTimes(prayerTimesArray);
    return data;
  }

  // function getPrayerStreak(name) {
  //   console.log(
  //     "%c 🇪🇸: getPrayerStreak -> name ",
  //     "font-size:16px;background-color:#98aadc;color:white;",
  //     name
  //   );
  //   let prayerStreak = 0;
  //   return prayerStreak;
  // }

  React.useEffect(() => {
    getPrayerTimes();
  }, []);

  React.useLayoutEffect(() => {
    setFromLocalStorage("PrayerStreak", [
      "Fajr",
      "Dhuhr",
      "Asr",
      "Maghrib",
      "Isha",
    ]);
  }, []);

  useEffect(() => {
    _toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometer(_angle(data));
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const _angle = (magnetometer) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y, z } = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(angle);
  };

  const _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return "NE";
    } else if (degree >= 67.5 && degree < 112.5) {
      return "E";
    } else if (degree >= 112.5 && degree < 157.5) {
      return "SE";
    } else if (degree >= 157.5 && degree < 202.5) {
      return "S";
    } else if (degree >= 202.5 && degree < 247.5) {
      return "SW";
    } else if (degree >= 247.5 && degree < 292.5) {
      return "W";
    } else if (degree >= 292.5 && degree < 337.5) {
      return "NW";
    } else {
      return "N";
    }
  };

  // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
  const _degree = (magnetometer) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  const { id, type } = route.params;

  const navigation = useNavigation();

  function incrementPrayerStreak(name) {
    //
    console.log("hi");
    console.log(name);
    // switch (name) {
    //       case name  == "Fajr":
    //         setFajirStatus(value);
    //         break;
    //       case name  == "Dhuhr":
    //         setDhuhrStatus(value);
    //         break;
    //       case name  == "Asr":
    //         setAsrStatus(value);
    //         break;
    //       case name  == "Maghrib":
    //         setMaghribStatus(value);
    //         break;
    //       case name == "Isha":
    //         setIshaStatus(value);
    //         break;
    //       default:
    //         break;
    //     }
  }

  function getPageTitle(type) {
    switch (type) {
      case "Prayer":
        return "Prayer";
      case "Hadith":
        return "Hadith";
      default:
        return "Loading...";
    }
  }

  function getSubTitle(type) {
    switch (type) {
      case "Prayer":
        return "Prayer";
      case "Hadith":
        return "Hadith";
      default:
        return "Loading...";
    }
  }

  function getPageImage(type) {
    switch (type) {
      case "Hadith":
        return require("../../../assets/AlQuranBook3.png");
      case "Thikr":
        return require("../../../assets/PrayerBeads2.png");
      case "Quran":
        return require("../../../assets/AlQuranBookRead.png");
      case "Prayer":
        return require("../../../assets/PrayerRugCarpet2.png");
      case "Charity":
        return require("../../../assets/CharityBox.png");
      default:
        return "Loading...";
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  if (type == "Compass") {
    return (
      <Grid style={{ backgroundColor: "black" }}>
        <Row style={{ alignItems: "center" }} size={0.9}>
          <Col style={{ alignItems: "center" }}>
            <Text
              style={{
                color: "#fff",
                fontSize: height / 26,
                fontWeight: "bold",
              }}
            >
              {_direction(_degree(magnetometer))}
            </Text>
          </Col>
        </Row>

        <Row style={{ alignItems: "center" }} size={0.1}>
          <Col style={{ alignItems: "center" }}>
            <View
              style={{
                position: "absolute",
                width: width,
                alignItems: "center",
                top: 0,
              }}
            >
              <Image
                source={require("../../../assets/compass_pointer.png")}
                style={{
                  height: height / 26,
                  resizeMode: "contain",
                }}
              />
            </View>
          </Col>
        </Row>

        <Row style={{ alignItems: "center" }} size={2}>
          <Text
            style={{
              color: "#fff",
              fontSize: height / 27,
              width: width,
              position: "absolute",
              textAlign: "center",
            }}
          >
            {_degree(magnetometer)}°
          </Text>

          <Col style={{ alignItems: "center" }}>
            <Image
              source={require("../../../assets/compass_bg.png")}
              style={{
                height: width - 80,
                justifyContent: "center",
                alignItems: "center",
                resizeMode: "contain",
                transform: [{ rotate: 360 - magnetometer + "deg" }],
              }}
            />
          </Col>
        </Row>

        <Row style={{ alignItems: "center" }} size={1}>
          <Col style={{ alignItems: "center" }}>
            <Text style={{ color: "#fff" }}>Copyright @RahulHaque</Text>
          </Col>
        </Row>
      </Grid>
    );
  }

  if (id == 2) {
    return (
      <>
        <HBody goBack={handleGoBack} title={getPageTitle(type)}>
          <SBannerItem>
            <SImageBackground source={getPageImage(type)}>
              <HBottomGradientBackground height={100}>
                <SButtonsContainer>
                  {/* <SCircle>
                    <Foundation
                      name="play"
                      size={30}
                      color={theme.colors.white}
                    />
                  </SCircle> */}
                  <HStack space={3}>
                    <STitle>{type}</STitle>
                    <STitleBadge>
                      {/* {getPrayerRakat(element.name)} */}حديث
                    </STitleBadge>
                  </HStack>

                  <SMoreOptions>
                    <Feather
                      name="heart"
                      size={25}
                      color={theme.colors.white}
                      style={{ marginRight: 40 }}
                    />
                    <Feather name="send" size={25} color={theme.colors.white} />
                  </SMoreOptions>
                </SButtonsContainer>
              </HBottomGradientBackground>
            </SImageBackground>
            <HTopGrandientBackground>
              {type == "Charity" ? (
                <>
                  <SContentItem></SContentItem>
                  <HSimpleList
                    title="Causes near you"
                    items={MyListData}
                    // onPressTitle={handleMyList}
                    renderIconTitle={
                      <Feather
                        name="chevron-right"
                        size={16}
                        color={theme.colors.white}
                      />
                    }
                    renderItem={({ item }) => (
                      <Pressable
                      // onPress={() => {
                      //   handleShowDetailItem(2, item.title);
                      // }}
                      >
                        <HSquareItemML
                          id={item.id}
                          image={item.uri}
                          title={item.title}
                        />
                      </Pressable>
                    )}
                  />
                </>
              ) : (
                <HSimpleList
                  title="Continue"
                  items={MyListData}
                  // onPressTitle={handleMyList}
                  renderIconTitle={
                    <Feather
                      name="chevron-right"
                      size={16}
                      color={theme.colors.white}
                    />
                  }
                  renderItem={({ item }) => (
                    <Pressable
                    // onPress={() => {
                    //   handleShowDetailItem(2, item.title);
                    // }}
                    >
                      <HSquareItemML
                        id={item.id}
                        image={item.uri}
                        title={item.title}
                      />
                    </Pressable>
                  )}
                />
              )}

              <SContentItem>
                {type === "Prayer" && (
                  <VStack space={3}>
                    <STitle>Todays times</STitle>

                    <VStack space={1}>
                      {prayerTimes.map((element, index) => {
                        switch (element.name) {
                          case "Fajr":
                            return (
                              <SItemInfo>
                                <SSubtitle>{element.name}</SSubtitle>
                                <SAdultBadge>
                                  <STitleBadge>
                                    {/* {getPrayerRakat(element.name)} */}2
                                  </STitleBadge>
                                </SAdultBadge>
                                <SSubtitle>{element.time}</SSubtitle>
                                <SSubtitle
                                  onPress={() => {
                                    incrementPrayerStreak(element.name);
                                  }}
                                  style={{
                                    textDecorationLine:
                                      prayerStreak[0].status == "pray now" &&
                                      "underline",
                                  }}
                                >
                                  {prayerStreak[0].status}
                                </SSubtitle>
                                <SSubtitle>
                                  {prayerStreak[0].streak}x streak
                                </SSubtitle>
                              </SItemInfo>
                            );
                            break;
                          case "Dhuhr":
                            return (
                              <SItemInfo>
                                <SSubtitle>{element.name}</SSubtitle>
                                <SAdultBadge>
                                  <STitleBadge>
                                    {/* {getPrayerRakat(element.name)} */}4
                                  </STitleBadge>
                                </SAdultBadge>
                                <SSubtitle>{element.time}</SSubtitle>
                                <SSubtitle
                                  onPress={() => {
                                    incrementPrayerStreak(element.name);
                                  }}
                                  style={{
                                    textDecorationLine:
                                      prayerStreak[1].status == "pray now" &&
                                      "underline",
                                  }}
                                >
                                  {prayerStreak[1].status}
                                </SSubtitle>
                                <SSubtitle>
                                  {prayerStreak[1].streak}x streak
                                </SSubtitle>
                              </SItemInfo>
                            );
                            break;
                          case "Asr":
                            return (
                              <SItemInfo>
                                <SSubtitle>{element.name}</SSubtitle>
                                <SAdultBadge>
                                  <STitleBadge>
                                    {/* {getPrayerRakat(element.name)} */}4
                                  </STitleBadge>
                                </SAdultBadge>
                                <SSubtitle>{element.time}</SSubtitle>
                                <SSubtitle
                                  onPress={() => {
                                    incrementPrayerStreak(element.name);
                                  }}
                                  style={{
                                    textDecorationLine:
                                      prayerStreak[2].status == "pray now" &&
                                      "underline",
                                  }}
                                >
                                  {prayerStreak[2].status}
                                </SSubtitle>
                                <SSubtitle>
                                  {prayerStreak[2].streak}x streak
                                </SSubtitle>
                              </SItemInfo>
                            );
                            break;
                          case "Maghrib":
                            return (
                              <SItemInfo>
                                <SSubtitle>{element.name}</SSubtitle>
                                <SAdultBadge>
                                  <STitleBadge>
                                    {/* {getPrayerRakat(element.name)} */}3
                                  </STitleBadge>
                                </SAdultBadge>
                                <SSubtitle>{element.time}</SSubtitle>
                                <SSubtitle
                                  onPress={() => {
                                    incrementPrayerStreak(element.name);
                                  }}
                                  style={{
                                    textDecorationLine:
                                      prayerStreak[3].status == "pray now" &&
                                      "underline",
                                  }}
                                >
                                  {prayerStreak[3].status}
                                </SSubtitle>
                                <SSubtitle>
                                  {prayerStreak[3].streak}x streak
                                </SSubtitle>
                              </SItemInfo>
                            );
                            break;
                          case "Isha":
                            return (
                              <SItemInfo>
                                <SSubtitle>{element.name}</SSubtitle>
                                <SAdultBadge>
                                  <STitleBadge>
                                    {/* {getPrayerRakat(element.name)} */}4
                                  </STitleBadge>
                                </SAdultBadge>
                                <SSubtitle>{element.time}</SSubtitle>
                                <SSubtitle
                                  onPress={() => {
                                    incrementPrayerStreak(element.name);
                                  }}
                                  style={{
                                    textDecorationLine:
                                      prayerStreak[4].status == "pray now" &&
                                      "underline",
                                  }}
                                >
                                  {prayerStreak[4].status}
                                </SSubtitle>
                                <SSubtitle>
                                  {prayerStreak[4].streak}x streak
                                </SSubtitle>
                              </SItemInfo>
                            );
                            break;
                          default:
                            break;
                        }
                      })}
                    </VStack>

                    <Box mt="5">
                      <STitle style={{ color: "#34312F", textAlign: "center" }}>
                        “Lord of the two sunrises and Lord of the two sunsets.”
                      </STitle>
                    </Box>
                    <HStack p="5" space={4}>
                      {prayerTimes.map((element, index) => {
                        switch (element.name) {
                          case "Sunrise":
                            return (
                              <Box
                                flex="1"
                                borderWidth="1px"
                                shadow={1}
                                bg="#3a271a"
                                borderColor="#f0ea71"
                                p="2"
                                rounded="sm"
                              >
                                <Heading color="#F0EA71">
                                  {element.name}
                                </Heading>
                                <Heading sub color="#F0EA71">
                                  {element.time}
                                </Heading>
                                <Feather
                                  style={{
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                  }}
                                  name="sunrise"
                                  size={50}
                                  color="#180C0A"
                                />
                              </Box>
                            );
                            break;
                          case "Sunset":
                            return (
                              <Box
                                flex="1"
                                borderWidth="1px"
                                shadow={1}
                                bg="#301A3A"
                                borderColor="#bf7af0"
                                p="2"
                                rounded="sm"
                              >
                                <Heading color="#BF7AEF">
                                  {element.name}
                                </Heading>
                                <Heading color="#BF7AEF" sub>
                                  {element.time}
                                </Heading>
                                <Feather
                                  style={{
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                  }}
                                  name="sunset"
                                  size={50}
                                  color="#180C0A"
                                />
                              </Box>
                            );
                            break;
                          default:
                            break;
                        }
                      })}
                    </HStack>

                    <STitle style={{ color: "#34312F", textAlign: "center" }}>
                      “O you wrapped up! Stand (to pray) all night, except a
                      little. Half of it or less than that, a little.”
                    </STitle>

                    <HStack p="5" space={4}>
                      {prayerTimes.map((element, index) => {
                        switch (element.name) {
                          case "Firstthird":
                            return (
                              <Box
                                alignItems={"center"}
                                p="2"
                                rounded="sm"
                                bg="#191919"
                                flex="1"
                              >
                                <Heading sub color="#9D9695">
                                  Pre
                                </Heading>
                                <Heading color="#9D9695">
                                  {element.time}
                                </Heading>
                              </Box>
                            );
                            break;
                          case "Midnight":
                            return (
                              <Box
                                bg="#191919"
                                alignItems={"center"}
                                p="2"
                                rounded="sm"
                                flex="1"
                              >
                                <Heading sub color="#9D9695">
                                  Midnight
                                </Heading>
                                <Heading color="#9D9695">
                                  {element.time}
                                </Heading>
                              </Box>
                            );
                            break;
                          case "Lastthird":
                            return (
                              <Box
                                bg="#191919"
                                alignItems={"center"}
                                p="2"
                                rounded="sm"
                                flex="1"
                              >
                                <Heading sub color="#9D9695">
                                  Post
                                </Heading>
                                <Heading color="#9D9695">
                                  {element.time}
                                </Heading>
                              </Box>
                            );
                            break;
                          default:
                            break;
                        }
                      })}
                    </HStack>

                    {/* <SSubtitle style={{ marginTop: 10 }}>
                  {getSubTitle(type)}
                </SSubtitle> */}
                  </VStack>
                )}
                {type === "Hadith" && (
                  <VStack space={3}>
                    {/* <Box mt="5">
                      <STitle style={{ color: "#34312F", textAlign: "center" }}>
                        “Lord of the two sunrises and Lord of the two sunsets.”
                      </STitle>
                    </Box> */}
                    {/* <HStack p="5" space={4}>
                      {prayerTimes.map((element, index) => {
                        switch (element.name) {
                          case "Sunrise":
                            return (
                              <Box
                                flex="1"
                                borderWidth="1px"
                                shadow={1}
                                bg="#3a271a"
                                borderColor="#f0ea71"
                                p="2"
                                rounded="sm"
                              >
                                <Heading color="#F0EA71">
                                  {element.name}
                                </Heading>
                                <Heading sub color="#F0EA71">
                                  {element.time}
                                </Heading>
                                <Feather
                                  style={{
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                  }}
                                  name="sunrise"
                                  size={50}
                                  color="#180C0A"
                                />
                              </Box>
                            );
                            break;
                          case "Sunset":
                            return (
                              <Box
                                flex="1"
                                borderWidth="1px"
                                shadow={1}
                                bg="#301A3A"
                                borderColor="#bf7af0"
                                p="2"
                                rounded="sm"
                              >
                                <Heading color="#BF7AEF">
                                  {element.name}
                                </Heading>
                                <Heading color="#BF7AEF" sub>
                                  {element.time}
                                </Heading>
                                <Feather
                                  style={{
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                  }}
                                  name="sunset"
                                  size={50}
                                  color="#180C0A"
                                />
                              </Box>
                            );
                            break;
                          default:
                            break;
                        }
                      })}
                    </HStack> */}

                    <STitle style={{ color: "#34312F", textAlign: "center" }}>
                      “O you wrapped up! Stand (to pray) all night, except a
                      little. Half of it or less than that, a little.”
                    </STitle>

                    <HStack p="5" space={4}>
                      {prayerTimes.map((element, index) => {
                        switch (element.name) {
                          case "Firstthird":
                            return (
                              <Box
                                alignItems={"center"}
                                p="2"
                                rounded="sm"
                                bg="#191919"
                                flex="1"
                              >
                                <Heading sub color="#9D9695">
                                  Pre
                                </Heading>
                                <Heading color="#9D9695">
                                  {element.time}
                                </Heading>
                              </Box>
                            );
                            break;
                          case "Midnight":
                            return (
                              <Box
                                bg="#191919"
                                alignItems={"center"}
                                p="2"
                                rounded="sm"
                                flex="1"
                              >
                                <Heading sub color="#9D9695">
                                  Midnight
                                </Heading>
                                <Heading color="#9D9695">
                                  {element.time}
                                </Heading>
                              </Box>
                            );
                            break;
                          case "Lastthird":
                            return (
                              <Box
                                bg="#191919"
                                alignItems={"center"}
                                p="2"
                                rounded="sm"
                                flex="1"
                              >
                                <Heading sub color="#9D9695">
                                  Post
                                </Heading>
                                <Heading color="#9D9695">
                                  {element.time}
                                </Heading>
                              </Box>
                            );
                            break;
                          default:
                            break;
                        }
                      })}
                    </HStack>

                    {/* <SSubtitle style={{ marginTop: 10 }}>
                  {getSubTitle(type)}
                </SSubtitle> */}
                  </VStack>
                )}
              </SContentItem>

              <HSimpleList
                title="My List"
                items={MyListData}
                // onPressTitle={handleMyList}
                renderIconTitle={
                  <Feather
                    name="chevron-right"
                    size={16}
                    color={theme.colors.white}
                  />
                }
                renderItem={({ item }) => (
                  <Pressable
                  // onPress={() => {
                  //   handleShowDetailItem(2, item.title);
                  // }}
                  >
                    <HSquareItemML
                      id={item.id}
                      image={item.uri}
                      title={item.title}
                    />
                  </Pressable>
                )}
              />

              {/* <SContentItem>
                <STitle>{type}</STitle>

                <SSubtitle style={{ marginTop: 10 }}>
                  {getSubTitle(type)}
                </SSubtitle>
              </SContentItem> */}

              {/* <SContentItem></SContentItem> */}
              {/* 
              <HSimpleList
                title="More Actions"
                items={["hu"]}
                renderItem={({ item }) => (
                  // <HPortraitItem
                  //   id={item.id}
                  //   image={item.poster_path}
                  //   onPress={(id: number) => handleChangeDetailItem(id, type)}
                  // />
                  <Box size="sm" bg={"white"}></Box>
                )}
              /> */}
            </HTopGrandientBackground>
          </SBannerItem>
        </HBody>
      </>
    );
  }
}
