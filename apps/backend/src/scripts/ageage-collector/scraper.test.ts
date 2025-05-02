import { expect, describe, it } from 'vitest'
import { getZipcodeAndAddress, getMunicipalityByAddress } from './scraper'

describe('getZipcodeAndAddress', () => {
  it('正しい郵便番号と住所を抽出する', () => {
    const fullAddress = '〒901-2133 沖縄県浦添市城間1-1-1'
    const result = getZipcodeAndAddress(fullAddress)
    
    expect(result.zipCode).to.equal('9012133')
    expect(result.address).to.equal('沖縄県浦添市城間1-1-1')
  })

  it('郵便番号がない場合は空文字を返し、住所をそのまま返す', () => {
    const fullAddress = '沖縄県那覇市おもろまち1-1-1'
    const result = getZipcodeAndAddress(fullAddress)
    
    expect(result.zipCode).to.equal('')
    expect(result.address).to.equal('沖縄県那覇市おもろまち1-1-1')
  })

  it('空文字の場合は空の郵便番号と空の住所を返す', () => {
    const fullAddress = ''
    const result = getZipcodeAndAddress(fullAddress)
    
    expect(result.zipCode).to.equal('')
    expect(result.address).to.equal('')
  })

  it('スペースがある場合も正しく処理する', () => {
    const fullAddress = '〒900-0001　沖縄県那覇市港町2-1-1'
    const result = getZipcodeAndAddress(fullAddress)
    
    expect(result.zipCode).to.equal('9000001')
    expect(result.address).to.equal('沖縄県那覇市港町2-1-1')
  })

  it('特殊なハイフン（en dash）を含む郵便番号の場合', () => {
    const fullAddress = '〒900–0015 沖縄県那覇市松山1-15-1'
    const result = getZipcodeAndAddress(fullAddress)
    
    expect(result.zipCode).to.equal('9000015')
    expect(result.address).to.equal('沖縄県那覇市松山1-15-1')
  })
})

describe('getMunicipalityByAddress', () => {
  it('市を含む住所から市名を抽出する', () => {
    const address = '沖縄県那覇市おもろまち1-1-1'
    const result = getMunicipalityByAddress(address)
    
    expect(result).to.equal('那覇市')
  })

  it('町を含む住所から町名を抽出する', () => {
    const address = '沖縄県北谷町美浜1-1-1'
    const result = getMunicipalityByAddress(address)
    
    expect(result).to.equal('北谷町')
  })

  it('村を含む住所から村名を抽出する', () => {
    const address = '沖縄県読谷村字高志保1-1-1'
    const result = getMunicipalityByAddress(address)
    
    expect(result).to.equal('読谷村')
  })

  it('郡を含む住所から正しく市町村名を抽出する', () => {
    const address = '沖縄県中頭郡北谷町美浜1-1-1'
    const result = getMunicipalityByAddress(address)
    
    expect(result).to.equal('北谷町')
  })

  it('沖縄県の表記がない場合も市町村名を抽出する', () => {
    const address = '那覇市おもろまち1-1-1'
    const result = getMunicipalityByAddress(address)
    
    expect(result).to.equal('那覇市')
  })

  it('市町村名が含まれない場合は空文字を返す', () => {
    const address = '沖縄県1-1-1'
    const result = getMunicipalityByAddress(address)
    
    expect(result).to.equal('')
  })

  it('空文字の場合は空文字を返す', () => {
    const address = ''
    const result = getMunicipalityByAddress(address)
    
    expect(result).to.equal('')
  })
}) 