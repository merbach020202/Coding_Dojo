using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace Speech.Utils
{
    public class SpeechService
    {
        private readonly string subscription = "9bdb21e0771644478a09d8813a8a19f6";
        private readonly string region = "eastus";


        public async Task<String> SpeechToTextAsync(string audioFilePath)
        {
            try
            {
                var config = SpeechConfig.FromSubscription(subscription, region);

                //reconhecimento de fala
                config.SpeechRecognitionLanguage = "pt-BR";

                using var audioConfig = AudioConfig.FromWavFileOutput(audioFilePath);
                using var speechRecognizer = new SpeechRecognizer(config, audioConfig);
                //reconhecimento de fala
                var result = await speechRecognizer.RecognizeOnceAsync();

                return result.Text;

            }

            catch (Exception)
            {
                throw;
            }
        }

    }
}
