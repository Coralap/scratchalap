export const TENSORFLOW_PREAMBLE =
`import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Input

# Optimizers
from tensorflow.keras.optimizers import (
    Adam,
    RMSprop,
    SGD,
    Adagrad
)

# Losses
from tensorflow.keras.losses import (
    MeanSquaredError,
    BinaryCrossentropy,
    CategoricalCrossentropy,
    SparseCategoricalCrossentropy
)

# Metrics
from tensorflow.keras.metrics import (
    Accuracy,
    BinaryAccuracy,
    CategoricalAccuracy,
    MeanAbsoluteError,
    Precision,
    Recall
)
\n`;