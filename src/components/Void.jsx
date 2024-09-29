import React, { useState, useEffect } from 'react';


function Void() {
  const [texte, setTexte] = useState('');
  useEffect(() => {
    fetch('/void', {cache : "no-store"})
      .then(response => response.text())
      .then(data => {
        setTexte(data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  return (
    <>
      <h3 className="content" dangerouslySetInnerHTML={{ __html: texte }} />
    </>
  );
}

export default React.memo(Void);
