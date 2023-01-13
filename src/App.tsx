import { useState } from 'react'
import Lottie from 'react-lottie'

import { useTheme } from '@siakit/core'
import { Heading } from '@siakit/heading'
import { Flex } from '@siakit/layout'
import { Tooltip } from '@siakit/tooltip'

import Car from './lottie/Comp 1 (1).json'
import { Calculator } from './pages/Calculator/Calculator'

export function App() {
  const { togggleTheme, changeColor, theme } = useTheme()
  const [themeDefault, setThemeDefault] = useState<any>('dark')

  changeColor('violet')
  togggleTheme(themeDefault)

  return (
    <>
      <Flex overflow padding align="center">
        <Flex overflow direction="column">
          <Flex padding="0 0 16px 0">
            <Heading>Simulador de carregamento</Heading>
          </Flex>
          <Tooltip content="Click to change theme">
            <button
              style={{
                color: '#6e56cf',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                border: 'none',
              }}
              onClick={() => {
                if (theme === 'dark') {
                  setThemeDefault('light')
                }
                if (theme === 'light') {
                  setThemeDefault('dark')
                }
              }}
            >
              <Flex>
                <Lottie
                  height={160}
                  width={160}
                  options={{
                    autoplay: true,
                    loop: true,
                    animationData: Car,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice',
                    },
                  }}
                />
              </Flex>
            </button>
          </Tooltip>
        </Flex>
      </Flex>
      <Flex
        overflow
        flex
        direction="column"
        align="center"
        justify="center"
        padding
      >
        <Calculator />
      </Flex>
    </>
  )
}
