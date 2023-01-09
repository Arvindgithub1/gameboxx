/* eslint-disable react-native/no-inline-styles */

import React, { useRef, useState, useCallback, useEffect } from "react";
import { BackHandler, StyleSheet, View, StatusBar, Dimensions, TouchableOpacity, Modal, Image, Text, Linking, Animated, Pressable } from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import * as Progress from 'react-native-progress';



const App = () => {
  const webView = useRef();

  const [first, setfirst] = useState(false)
  const updateurl = useRef("")
  const [prograss, setprograss] = useState(0)
  const [lode, setlode] = useState(false)

  const [adurl, setadsurl] = useState('')
  const sk = new Animated.ValueXY({ x: 0, y: 0 })
  Animated.timing(sk, {
    toValue: { x: 1, y: 1 },
    duration: 300,
    useNativeDriver: true,

  }).start()





  const [Ratemodalvisible, setRatemodalvisible] = useState(false)



  function nyra() {
    AsyncStorage.setItem('key2', 'no')
  }
  function nyr() {
    AsyncStorage.setItem('key3', 'yes')
  }
  function ratingmodal() {

    try {
      AsyncStorage.getItem('key').then((yx) => {


        if (yx == null) {
          AsyncStorage.setItem('key', '1')

        } 
      })

 

      AsyncStorage.getItem('key').then((t) => {
        var x = parseInt(t)
        if (x <= 32) {
          var xx = x + 1
          if (x == 5) {
            setRatemodalvisible(true)
          } else if (x == 30) {
            AsyncStorage.getItem('key2').then((t) => {

              AsyncStorage.getItem('key3').then((xz) => {
                if (t == "no" || xz == null) {
                  setRatemodalvisible(true)
                }

              })



            })

          }

          AsyncStorage.setItem('key', xx.toString())

        } 

      })


    } catch (ele) {

    }

  }

  useEffect(() => {
    async function ssk() {
      try {
        let xz = await fetch('https://www.googleapis.com/blogger/v3/blogs/2612455177231055706/posts/6335790184799988109?key=AIzaSyAb4fOUYbx6NmvBcLfaCnyBcArtE_ENv8w')
        let x1 = await xz.json()
        let xx = x1.content
        let gg = JSON.parse(xx)
        updateurl.current = `${gg.url}`
        setfirst(gg.yen == true || gg.yen == false ? gg.yen : false)
        setadsurl(gg.ads)
        if (gg.yen == false) {
          ratingmodal()
        }
      } catch {

      }
    }
    ssk()


  }, [])


  const [canGoBack, setCanGoBack] = useState(false);

  const handleBack = useCallback(() => {
    if (canGoBack && webView.current) {
      // @ts-ignore
      webView.current.goBack();
      return true;
    }
    return false;
  }, [canGoBack]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
    };
  }, [handleBack]);

  function netcheck() {
    NetInfo.refresh().then(state => {


      setnet('false' == `${state.isConnected}` ? 'false' : '');

    });

  }

  useEffect(() => {

    setInterval(() => {
      netcheck()
    }, 1000);
    return () => {
      false
    }
  }, [lode])

  const [net, setnet] = useState('true')

  function netcheckbutton() {
    NetInfo.refresh().then(state => {

      setnet(`${state.isConnected}`);

    });

  }
  return (
    <View style={styles.v3}>
      <StatusBar
        hidden={true}
      />



      {net == 'false' ?
        <View style={{ backgroundColor: "rgb(246,246,246)", height: '100%', width: "100%", justifyContent: "center", alignItems: "center" }}>
          <Image source={require('./netn.png')} style={{ height: 100, width: 120, marginBottom: 20 }} />
          <Text style={{ fontSize: 20, color: "black", fontWeight: "700" }}>No internet connection</Text>
          <Text style={{ marginTop: 5, color: 'black' }}>Please check your internet connection </Text>
          <Text style={{ marginTop: 3, color: 'black' }}>and try again </Text>
          <TouchableOpacity style={{ marginTop: 40 }} activeOpacity={.8} onPress={() => {
            netcheckbutton()

          }}>

            <View style={{ height: 45, width: 125, backgroundColor: "rgb(62, 79, 112)", borderRadius: 25, alignItems: "center", justifyContent: "center", elevation: 12 }}>

              <Text style={{ color: "white", fontSize: 15, fontWeight: "900" }}>TRY AGAIN</Text>
            </View>
          </TouchableOpacity>

        </View> :
        <View style={{ flex: 1 }}>

          <View style={{
            backgroundColor: "black",
            height: 6
          }}>
            <WebView
              source={{ uri: adurl ? adurl : "https://newsbox33.blogspot.com/" }}
              style={{ backgroundColor: "black" }}
            />
            <WebView
              source={{ uri: adurl ? adurl : "https://newsbox33.blogspot.com/" }}
              style={{ backgroundColor: "black" }}

            />
          </View>



          {!lode ?
            <Progress.Bar progress={prograss} width={null} borderRadius={0} borderWidth={0} color="blue" />
            : null
          }
          <WebView
            ref={webView}
            style={{ height: "100%", width: "100%" }}
            source={{ uri: "https://poki.com/" }}
            allowsFullscreenVideo={true}
            setBuiltInZoomControls={false}
            onLoadProgress={(event) => {
              setCanGoBack(event.nativeEvent.canGoBack)

              setprograss(event.nativeEvent.progress)
              if (event.nativeEvent.progress == 1) {
                setlode(true)
              }

            }}
            onError={(event) => {
              setnet('false')

            }}
          />
        </View>}

      <Modal visible={first} transparent={true} statusBarTranslucent={true} >

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,.65)" }}

        >
          <Animated.View style={{
            height: 270, width: 300,
            backgroundColor: "#fff", borderRadius: 9, elevation: 10,
            justifyContent: "center", alignItems: "center",
            transform: [
              { scaleX: sk.x },
              { scaleY: sk.y },
            ]
          }}>

            <View style={{ width: "100%", height: 100, justifyContent: "center", alignItems: "center", position: "absolute", top: 17 }}>
              <Image

                source={require('./dd.jpeg')}
                style={{ height: 100, width: 100 }}
              />
            </View>
            <View style={{ height: 50, width: "100%", justifyContent: "center", alignItems: "center", position: "absolute", top: 115 }}>
              <Text style={{ color: "#000", fontSize: 19, fontWeight: "700" }}>
                App Update
              </Text>
            </View>

            <View style={{ height: 40, width: "85%", justifyContent: "center", alignItems: "center", position: "absolute", top: 155 }}>
              <Text style={{ color: "#000", fontSize: 15, fontWeight: "600" }}>
                Continue with App update?
              </Text>
            </View>

            <View style={{ height: 50, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center", position: "absolute", bottom: 15 }}>
              <View style={[styles.update, { overflow: "hidden" }]}>
                <Pressable style={styles.update} android_ripple={{ borderless: true, radius: 65, color: "#f5e1ee", foreground: true }} activeOpacity={.9} onPress={() => {
                  Linking.openURL(updateurl.current)
                }}>

                  <Text style={{ color: "white", fontSize: 20, fontWeight: "900" }}>UPDATE</Text>
                </Pressable>
              </View>


            </View>

          </ Animated.View>
        </View>
      </Modal>



      <Modal transparent={true} visible={Ratemodalvisible} statusBarTranslucent={true} onRequestClose={() => {
        setRatemodalvisible(false)
        nyra()
      }} >

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,.5)" }}>
          <Animated.View style={{
            height: 300, width: 300,
            backgroundColor: "white", borderRadius: 9, elevation: 10,
            justifyContent: "center", alignItems: "center",
            transform: [
              { scaleX: sk.x },
              { scaleY: sk.y }
            ]
          }}>
            <View style={{ width: "100%", height: 100, justifyContent: "center", alignItems: "center", position: "absolute", top: 30, flexDirection: "row" }}>
              <Image

                source={require('./cc.jpeg')}
                style={{ height: 150, width: 150 }}
              />
              <TouchableOpacity activeOpacity={.8} style={{ position: "absolute", right: 8, top: -23, elevation: 10 }}
                onPress={() => {
                  setRatemodalvisible(false)
                  nyra()
                }} >
                <View style={{ height: 50, width: 40 }} >
                  <Text style={{ fontSize: 26, color: "red" }}>
                    ❌
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ height: 50, width: "100%", justifyContent: "center", alignItems: "center", position: "absolute", top: 138 }}>
              <Text style={{ color: "black", fontSize: 21, fontWeight: "700" }}>

                Please Rate our App

              </Text>
            </View>

            <View style={{ height: 40, width: "85%", justifyContent: "center", alignItems: "center", position: "absolute", top: 183 }}>
              <Text style={{ color: "black", fontSize: 30 }}>
                ⭐⭐⭐⭐⭐
              </Text>
            </View>

            <View style={{ height: 50, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center", position: "absolute", bottom: 18 }}>


              <TouchableOpacity activeOpacity={.9} onPress={() => {
                Linking.openURL('https://play.google.com/store/apps/details?id=com.gamstkm')
                setRatemodalvisible(false)
                nyr()

              }}>
                <View style={{ height: 42, width: 250, backgroundColor: "red", borderRadius: 18, alignItems: "center", justifyContent: "center", elevation: 10, marginTop: 10 }}>

                  <Text style={{ color: "white", fontSize: 20, fontWeight: "900" }}>Rate 5 Stars🌟</Text>
                </View>
              </TouchableOpacity>


            </View>
          </Animated.View>
        </View>
      </Modal>


    </View>


  );
}
const styles = StyleSheet.create({
  v1: {
    height: 50,
    width: "100%",
    backgroundColor: "#65F9ED",
    justifyContent: "center",
    alignItems: "center",

  },
  v2: {
    display: "none"
  },
  v3: {
    height: "100%"
  },
  update: {
    height: 44, width: 145, 
    backgroundColor: "red", 
    borderRadius: 25,
     alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  }

})



export default App;


