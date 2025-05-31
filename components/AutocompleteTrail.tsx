import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface AutocompleteInputProps {
  name: string;
  value: string;
  onChange: (e: any) => void;
}

const AutocompleteInput = ({ name, value, onChange }: AutocompleteInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
      libraries: ["places"],
    });

    loader.load().then(() => {
      if (!window.google || !inputRef.current) return;

      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ["establishment"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        let newValue = place.name || inputRef.current?.value || ""

        onChange({
          target: {
            name,
            value: newValue,
          },
        });
      });
    });
  }, [name, onChange]);

  return (
    <input
      ref={inputRef}
      name={name}
      value={value}
      onChange={onChange}
      placeholder="Enter Trail Name"
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm"
    />
  );
};

export default AutocompleteInput;
