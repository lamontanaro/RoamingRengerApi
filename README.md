### RoamingRengerAPI

## Class Diagram

![class diagram](uml.png)

https://www.planttext.com

### Jueves 28 Intro a las API's

* Objetivos de la meet
* Un review rapido a donde se pretende llegar
* Tools que utilizaremos
* Conceptos de Verbos Http, swagger, UML
* revisar el codigo explicarlo
* Herramientas para testear las APIS
* Agregar nuevos endpoints
* Objetivos de la proxima clase?
  
### Para el proximo jueves

Generar los siguientes endpoints para la clase **TouristAttraction**:

|Verbo HTTP | Nombre|
|-----------|-------|
|POST|createAttraction|
|GET|getAttractionbyId|
|PUT|updateAttraction|
|DELETE|deleteAttraction|


```
class TouristAttraction {
    - attractionId: int
    - name: string
    - description: string
    - location: string
    - image: string
}
```

![class diagram](postman.png)