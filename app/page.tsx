"use client"
import { useState } from 'react';
import { Colour } from './types';
import findClosestColour from '../utils/colourfinder';

export default function HomePage() {
  const [targetColour, setTargetColour] = useState('');
  const [closestColour, setClosestColour] = useState<Colour | null>(null);
  const [closestColours, setClosestColours] = useState<[Colour, Colour] | null>(null);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetColour(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await findClosestColour(targetColour);
    setClosestColour(result.single);
    setClosestColours(result.pair);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="color" value={targetColour} onChange={handleColorChange} />
        <button type="submit">Find closest colors</button>
      </form>
      {closestColour && (
        <div>
          <p>The closest single color is: {closestColour.Colour}</p>
          <p>Hex code: {closestColour.Hex}</p>
          <p>Number: {closestColour.Number}</p>
        </div>
      )}
      {closestColours && (
        <div>
          <p>The closest pair of colors are: {closestColours[0].Colour} and {closestColours[1].Colour}</p>
          <p>Hex codes: {closestColours[0].Hex} and {closestColours[1].Hex}</p>
          <p>Numbers: {closestColours[0].Number} and {closestColours[1].Number}</p>
        </div>
      )}
    </div>
  );
}