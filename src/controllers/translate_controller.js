import { v2 } from '@google-cloud/translate'
import languages from '../data/languages.js'

const Translate = v2.Translate

const translate = new Translate({
  credentials: process.env.CREDENTIALS,
  projectId: process.env.PROJECTID,
  key: process.env.TRANSLATE_API_KEY,
})

export const getLanguagesList = (req, res) => {
  res.render('index', {
    languageSymbols: languages,
    translation: 'translation will be displayed here..',
    error: null,
  })
}

export const translateText = async (req, res) => {
  const { text, targetLanguage } = req.body

  if (text.length === 0 || targetLanguage === null) {
    res.render('index', {
      languageSymbols: languages,
      translation: 'translation will be displayed here..',
      error: 'Please input text and select language',
    })
  }

  try {
    let [response] = await translate.translate(text, targetLanguage)
    res.render('index', {
      languageSymbols: languages,
      translation: response,
      error: null,
    })
    return response
  } catch (error) {
    res.render('index', {
      languageSymbols: languages,
      translation: 'translation will be displayed here..',
      error: error,
    })
    return 0
  }
}

const detectLanguage = async (text) => {
  try {
    let response = await translate.detect(text)
    return response[0].language
  } catch (error) {
    console.log(`Error at detectLanguage --> ${error}`)
    return 0
  }
}
