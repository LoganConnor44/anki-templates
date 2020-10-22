import Tone from '../enums/Tone';

abstract class Phonetic {
	protected tone: Tone;
	public setTone(number: number): void {
		switch(number) {
			case 1:  {
				this.tone = Tone.FIRST;
				break;
			}
			case 2:  {
				this.tone = Tone.SECOND;
				break;
			}
			case 3:  {
				this.tone = Tone.THIRD
				break;
			}
			case 4:  {
				this.tone = Tone.FORTH;
				break;
			}
			default: {
				this.tone = Tone.NEUTRAL;
				break;
			}
		}
	}
}

export default Phonetic;