function CalculerIMC(){
		poids = document.getElementById("poids").value;
		taille =  document.getElementById("taille").value;
		taille = taille/100;

        imcText = document.getElementById('imc');
        typeText = document.getElementById('categorie');

		IMC = poids / (taille * taille);
		
        IMC = Math.round(IMC * 10.0) / 10.0;
		
		if(IMC <=  15.9) {
			typeText.innerText = "extrêmement maigre";
            imcText.innerText = IMC;
		}
		
		else if(IMC >= 16.0 && IMC <= 18.9) {
			typeText.innerText = "mince"
            imcText.innerText = IMC;
		}
		
		else if(IMC >= 21.0 && IMC <= 24.9) {
			typeText.innerText = "normal";
            imcText.innerText = IMC;
		}
		
		else if(IMC >= 25.0 && IMC <= 29.9) {
			typeText.innerText = "surpoids";
            imcText.innerText = IMC;
		}
		
		else if(IMC >= 30.0 && IMC <= 34.9) {
			typeText.innerText = "obésité modérée";
            imcText.innerText = IMC;
		}
		
		else if(IMC >= 35.0 && IMC <= 39.9) {
            typeText.innerText = "obésité sévère";
            imcText.innerText = IMC;
		}
		
		else if (IMC >= 40.0) {
            typeText.innerText = "obésité massive";
            imcText.innerText = IMC;
		}
}