type Props = {
  value: number
  width: number
  height: number
  newWidth: number
  newHeight: number
}

export const checkMaxBombsValue = ({
  value,
  width,
  height,
  newWidth,
  newHeight
}: Props): boolean => {
  if (newWidth && newHeight) {
    return value >= newWidth * newHeight
  }

  return value >= width * height
}
