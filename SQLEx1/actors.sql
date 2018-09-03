DROP TABLE IF EXISTS Actors;

CREATE TABLE Actors (
    Name VARCHAR(255) not null,
    Age INTEGER not null,
    Number_of_Oscars INTEGER not null
);

INSERT INTO Actors (Name,Age,Number_of_Oscars) VALUES
('Leonardo DiCaprio',	41,	1),
('Jennifer Lawrence', 25,	1),
('Samuel L. Jackson',	67,	0),
('Meryl Streep'	, 66,	3),
('John Cho'	, 43, 0);

SELECT Name
FROM Actors
WHERE Number_of_Oscars>1;

SELECT Name
FROM Actors
WHERE Age>30;
