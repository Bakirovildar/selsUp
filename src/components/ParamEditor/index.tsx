import './styles.css';
import React from "react";

interface Param {
    id: number;
    name: string;
    type: "string";
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
    colors: string[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    paramValues: ParamValue[];
}

export class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            paramValues: props.model.paramValues,
        };
    }

    handleChange = (paramId: number, value: string) => {
        this.setState((prevState) => {
            const updatedParamValues = prevState.paramValues.map((paramValue) => {
                if (paramValue.paramId === paramId) {
                    return { ...paramValue, value };
                }
                return paramValue;
            });

            if (!updatedParamValues.find((p) => p.paramId === paramId)) {
                updatedParamValues.push({ paramId, value });
            }

            return { paramValues: updatedParamValues };
        });
    };

    public getModel(): Model {
        return {
            paramValues: this.state.paramValues,
            colors: this.props.model.colors,
        };
    }

    render() {
        const { params } = this.props;
        const { paramValues } = this.state;

        return (
            <div className="param-editor">
                {params.map((param) => {
                    const paramValue = paramValues.find((pv) => pv.paramId === param.id)?.value || "";

                    return (
                        <div key={param.id} className="param-field">
                            <label htmlFor={`param-${param.id}`}>{param.name}</label>
                            <input
                                id={`param-${param.id}`}
                                type="text"
                                value={paramValue}
                                onChange={(e) => this.handleChange(param.id, e.target.value)}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default ParamEditor;
