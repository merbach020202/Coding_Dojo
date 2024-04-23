using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CognitiveServices.Speech;
using Speech.Utils;

namespace Speech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpeechController : ControllerBase
    {
        private readonly SpeechService _speechService;

        public SpeechController(SpeechService speechService)
        {
            _speechService = speechService;
        }

        [HttpPost("SpeechToText")]
        public async Task<IActionResult> SpeechToText(IFormFile audioFile)
        {
            try
            {
                var tempFilePath = Path.GetTempFileName();
                using (var stream = new FileStream(tempFilePath, FileMode.Create))
                {
                    await audioFile.CopyToAsync(stream);
                }

                var transcription = await _speechService.SpeechToTextAsync(tempFilePath);

                return Ok(new { Transcription = transcription });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost]
        [Route("TextToSpeech")]
        public async Task<IActionResult> ConvertTextToSpeech([FromBody] string text)
        {
            try
            {
                var speechConfig = SpeechConfig.FromSubscription("9bdb21e0771644478a09d8813a8a19f6", "eastus");
                using (var synthesizer = new SpeechSynthesizer(speechConfig))
                {
                    var result = await synthesizer.SpeakTextAsync(text);

                    if (result.Reason == ResultReason.SynthesizingAudioCompleted)
                    {
                        return File(result.AudioData, "audio/mpeg", "output.mp3");
                    }
                    else
                    {
                        return BadRequest("Erro ao sintetizar áudio");
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
