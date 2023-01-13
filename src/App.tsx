import { useState } from 'react'
import Lottie from 'react-lottie'

import { Theme, useTheme } from '@siakit/core'
import { Heading } from '@siakit/heading'
import { Flex } from '@siakit/layout'
import { Tooltip } from '@siakit/tooltip'

import Car from './lottie/Comp 1 (1).json'
import { Calculator } from './pages/Calculator/Calculator'

export function App() {
  const { togggleTheme, changeColor, theme } = useTheme()
  const [themeDefault, setThemeDefault] = useState<Theme>('dark')

  changeColor('violet')
  togggleTheme(themeDefault)

  return (
    <Flex flex>
      <Flex flex overflow padding direction="column">
        <Flex align="start">
          <Flex align="center">
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
                    height={56}
                    width={56}
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
            <Heading>Simulador de carregamento</Heading>
          </Flex>
        </Flex>

        <Flex overflow flex direction="column" align="center" justify="center">
          <Calculator />
        </Flex>
      </Flex>
    </Flex>
  )
}
