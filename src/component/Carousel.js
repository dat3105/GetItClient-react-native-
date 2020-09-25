import React,{useState,useEffect, useRef} from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native'
import CarouselItem from './CarouselItem'

const { width, heigth } = Dimensions.get('window')

function infiniteScroll(dataList, flatlistRef){
    
    const numberOfData = dataList.length
    let scrollValue = 0, scrolled = 0

    setInterval(function() {
        scrolled ++
        if(scrolled < numberOfData)
        scrollValue = scrollValue + width

        else{
            scrollValue = 0
            scrolled = 0
        }

           
        flatlistRef.current.scrollToOffset({ animated: true, offset: scrollValue})
        
        
        
    }, 10000000)
}


const Carousel = ({ data }) => {
    const flatlistRef = useRef(null)
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)
    const [dataList, setDataList] = useState(data)
    const infiniteRef = useRef();

    useEffect(() => {
        setDataList(data)
        if(data.length && flatlistRef.current) {
            const numberOfData = data.length
            let scrollValue = 0, scrolled = 0
            infiniteRef.current = setInterval(function() {
                scrolled ++
                if(scrolled < numberOfData)
                scrollValue = scrollValue + width-32
                else{
                    scrollValue = 0
                    scrolled = 0
                }
                flatlistRef.current.scrollToOffset({ animated: true, offset: scrollValue})
            }, 5000)
        }
        return () => clearInterval(infiniteRef.current)
    }, [])

    if (data && data.length) {
        return (
            <View>
                <FlatList data={data}
                ref={flatlistRef}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <CarouselItem item={item} />
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        {useNativeDriver: false}
                    )}
                />

                <View style={styles.dotView}>
                    {data.map((_, i) => {
                        let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })
                        return (
                            <Animated.View
                                key={i}
                                style={{ opacity, height: 10, width: 10, backgroundColor: '#2F84FF', margin: 8, borderRadius: 5 }}
                            />
                        )
                    })}

                </View>
            </View>
        )
    }

    console.log('Please provide Images')
    return null
}

const styles = StyleSheet.create({
    dotView: { flexDirection: 'row', justifyContent: 'center' }
})

export default Carousel