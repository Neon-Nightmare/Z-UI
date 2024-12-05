import React from "react";

const DetailsContext = React.createContext({details: {}, setDetails: () => {}})

const InformationContext = React.createContext({information: {}, setInfos: () => {}})

export {DetailsContext as default, InformationContext};