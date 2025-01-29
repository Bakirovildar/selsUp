import React from "react";
import ParamEditor from "./components/ParamEditor/index";

function App() {
    const params = [
        { id: 1, name: "Назначение", type: "string" },
        { id: 2, name: "Длина", type: "string" },
        { id: 3, name: "Ширина", type: "string" },
    ];

    const model = {
        paramValues: [
            { paramId: 1, value: "повседневное" },
            { paramId: 2, value: "макси" },
            { paramId: 3, value: "мини" },
        ],
        colors: ["красный", "синий"],
    };

    const paramEditorRef = React.useRef<ParamEditor>(null);

    const handleGetModel = () => {
        if (paramEditorRef.current) {
            const updatedModel = paramEditorRef.current.getModel();
            console.log("Обновление модели:", updatedModel);
        }
    };

    return (
        <div className="App">
            <h1>Редактор параметров</h1>
            <ParamEditor ref={paramEditorRef} params={params} model={model} />
            <button onClick={handleGetModel}>Получить модель</button>
        </div>
    );
}

export default App;
