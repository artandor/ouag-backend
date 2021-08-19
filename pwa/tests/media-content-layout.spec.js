import {MediaObject} from "../types/MediaObject";
import {getComponentFromType} from "../components/media_object/MediaContentLayout";
import ShowImage from "../components/media_object/type_layouts/ShowImage";
import ShowVideo from "../components/media_object/type_layouts/ShowVideo";
import ShowText from "../components/media_object/type_layouts/ShowText";

test('getComponentFromType should return ShowImage Component for gif files', () => {
  let media = new MediaObject()
  media.type = 'image/gif'
  expect(getComponentFromType(media, false)).toBeTruthy()
  expect(getComponentFromType(media, false)).toEqual(<ShowImage media={media} nsfw={false} thumbnail={false}/>)
})

test('getComponentFromType should return ShowImage Component for png files', () => {
  let media = new MediaObject()
  media.type = 'image/png'
  expect(getComponentFromType(media, false)).toBeTruthy()
  expect(getComponentFromType(media, false)).toEqual(<ShowImage media={media} nsfw={false} thumbnail={false}/>)
})

test('getComponentFromType should return ShowImage Component for jpeg files', () => {
  let media = new MediaObject()
  media.type = 'image/jpeg'
  expect(getComponentFromType(media, false)).toBeTruthy()
  expect(getComponentFromType(media, false)).toEqual(<ShowImage media={media} nsfw={false} thumbnail={false}/>)
})

test('getComponentFromType should return ShowVideo Component for mp4 files', () => {
  let media = new MediaObject()
  media.type = 'video/mp4'
  expect(getComponentFromType(media, false)).toBeTruthy()
  expect(getComponentFromType(media, false)).toEqual(<ShowVideo media={media} nsfw={false} autoplay={false}
                                                                thumbnail={false}/>)
})

test('getComponentFromType should return ShowLink Component for link files', () => {
  let media = new MediaObject()
  media.type = 'image/link'
  expect(getComponentFromType(media, false)).toBeTruthy()
  expect(getComponentFromType(media, false)).toEqual(<ShowText media={media} nsfw={false}/>)
})

test('getComponentFromType should return ShowText Component for text files', () => {
  let media = new MediaObject()
  media.type = 'image/text'
  expect(getComponentFromType(media, false)).toBeTruthy()
  expect(getComponentFromType(media, false)).toEqual(<ShowText media={media} nsfw={false}/>)
})

test('getComponentFromType should return ShowText Component for fake files', () => {
  let media = new MediaObject()
  media.type = 'image/blabla'
  expect(getComponentFromType(media, false)).toBeTruthy()
  expect(getComponentFromType(media, false)).toEqual(<ShowText media={media} nsfw={false}/>)
})
