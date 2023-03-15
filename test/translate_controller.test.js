import { assert } from 'chai'
import { spy, match } from 'sinon'
import { translateText } from '../src/controllers/translate_controller.js'

describe('translateText', function () {
  let languages

  beforeEach(() => {
    languages = [
      { code: 'en', name: 'English' },
      { code: 'fr', name: 'French' },
      { code: 'es', name: 'Spanish' },
    ]
  })

  it('should return an error message if no text or targetLanguage is provided', async function () {
    const req = { body: { text: '', targetLanguage: null } }
    const res = {
      render: spy(),
    }

    await translateText(req, res)

    assert.isTrue(
      res.render.calledWith('index', {
        languageSymbols: languages,
        translation: null,
        error: 'Please input text and select language',
      }),
    )
  })

  it('should return the translated text if text and targetLanguage are provided', async function () {
    const req = { body: { text: 'Hello', targetLanguage: 'es' } }
    const res = {
      render: spy(),
    }

    await translateText(req, res)

    assert.isTrue(
      res.render.calledWith('index', {
        languageSymbols: languages,
        translation: 'Hola',
        error: null,
      }),
    )
  })

  it('should return an error if translation fails', async function () {
    const req = {
      body: { text: 'Hello', targetLanguage: 'invalid-language-code' },
    }
    const res = {
      render: spy(),
    }

    await translateText(req, res)

    assert.isTrue(
      res.render.calledWith('index', {
        languageSymbols: languages,
        translation: null,
        error: match.instanceOf(Error),
      }),
    )
  })
})
