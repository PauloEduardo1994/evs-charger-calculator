import React, { useState, useRef } from 'react'
import Lottie from 'react-lottie'

import * as Yup from 'yup'

import { Button } from '@siakit/button'
import { Card } from '@siakit/card'
import { Footer } from '@siakit/footer'
import {
  Form,
  NumberInput,
  Select,
  MoneyInput,
  FormHandles,
} from '@siakit/form-unform'
import { Flex } from '@siakit/layout'
import { Separator } from '@siakit/separator'
import { Text } from '@siakit/text'

import getValidationErrors from '../../helpers/getValidationErrors'
import Charger from '../../lottie/charger.json'

export function Calculator() {
  const formRef = useRef<FormHandles>(null)
  const [priceCharger, setPriceCharger] = useState(0)
  const [timeForCharger, setTimeForCharger] = useState(0)
  const [priceForKm, setPriceForKm] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)

  console.log(priceCharger, timeForCharger, priceForKm)

  async function handleSubmit(result: any): Promise<any> {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        selectCharger: Yup.string().required('Campo obrigatório').nullable(),
        chargerPower: Yup.string().when('Campo obrigatório', {
          is: !modalVisible,
          then: () => Yup.string().required('Campo obrigatório').nullable(),
        }),
        batterySize: Yup.string().required('Campo obrigatório'),
        energyCost: Yup.string().required('Campo obrigatório'),
      })

      await schema.validate(result, {
        abortEarly: false,
      })

      const total =
        result.batterySize *
        parseFloat(result.energyCost.replace('.', '').replace(',', '.'))
      const resultPriceOfCharger = total

      const resultPriceForKm = total / result.carAutonomy

      let resultSelectCharger = result.selectCharger

      const clientCharger = result.chargerPower

      if (resultSelectCharger === '7kwh') {
        resultSelectCharger = 7
      } else if (resultSelectCharger === '11kwh') {
        resultSelectCharger = 11
      } else if (resultSelectCharger === 'portable7') {
        resultSelectCharger = 7
      } else if (resultSelectCharger === 'client') {
        resultSelectCharger = clientCharger
        setModalVisible(true)
      }

      const resultTimeForCharger = result.batterySize / resultSelectCharger

      setPriceCharger(resultPriceOfCharger)
      setTimeForCharger(resultTimeForCharger)
      setPriceForKm(resultPriceForKm)
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
      }
    } finally {
      console.log('finaly')
    }
  }

  function handleResetReseult(): any {
    setPriceCharger(0)
    setTimeForCharger(0)
    setPriceForKm(0)
    formRef?.current?.reset()
  }

  return (
    <Flex flex overflow direction="column" flexWrap="wrap">
      <Form flex overflow ref={formRef} onSubmit={handleSubmit}>
        <Flex flex overflow align="center">
          <Card flex overflow direction="column" flexWrap="wrap" gap>
            <Flex gap direction="column" padding>
              <Select
                name="selectCharger"
                label="Selecione o carregador *"
                placeholder="Ex: Wallbox 7kWh"
                onChange={(value: any) => {
                  if (value.value === 'client') {
                    setModalVisible(true)
                  } else {
                    setModalVisible(false)
                    formRef?.current?.setFieldValue('chargerPower', '')
                  }
                }}
                options={[
                  {
                    label: 'Wallbox 7 kWh',
                    value: '7kwh',
                  },
                  {
                    label: 'Wallbox 11 kWh',
                    value: '11kwh',
                  },
                  {
                    label: 'Carregador portatil 32A 7 kWh',
                    value: 'portable7',
                  },
                  {
                    label: 'Carregador do cliente',
                    value: 'client',
                  },
                ]}
              />
              <NumberInput
                label="Potência do carregador *"
                name="chargerPower"
                placeholder="Ex: 7 kWh"
                disabled={!modalVisible}
              />
              <MoneyInput label="Preço médio da energia *" name="energyCost" />
              <NumberInput
                label="Tamanho da bateria do carro *"
                name="batterySize"
                placeholder="Ex: 70 kW (Quilowatt)"
              />
              <NumberInput
                label="Autonomia do carro"
                name="carAutonomy"
                placeholder="Ex: 500 km"
              />
            </Flex>
            <Footer>
              <Button
                variant="ghost"
                colorScheme="red"
                type="button"
                onClick={handleResetReseult}
              >
                Limpar
              </Button>
              <Button type="submit">Calcular</Button>
            </Footer>
          </Card>
          <Flex
            flex
            flexWrap="wrap"
            direction="column"
            gap={8}
            padding
            width={380}
          >
            <Flex justify="between">
              <Text>Preço médio para carga completa:</Text>
              <Text>
                {priceCharger.toLocaleString('PT-BR', {
                  minimumFractionDigits: 2,
                  style: 'currency',
                  currency: 'BRL',
                })}
              </Text>
            </Flex>
            <Separator />
            <Flex align="center" justify="between">
              <Text>Tempo médio para carga completa:</Text>
              <Text>{timeForCharger.toFixed(2)} H/m</Text>
            </Flex>
            <Separator />
            <Flex align="center" justify="between">
              <Text>Valor pago por km rodado:</Text>
              {priceForKm.toLocaleString('PT-BR', {
                minimumFractionDigits: 2,
                style: 'currency',
                currency: 'BRL',
              })}
            </Flex>
            <Flex>
              <Lottie
                height={280}
                width={280}
                options={{
                  autoplay: true,
                  loop: true,
                  animationData: Charger,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                  },
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  )
}
